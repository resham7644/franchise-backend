var{userModel,getUserModel} = require('../models/userModel');
var colRef = getUserModel();
var path = require("path");
const cloudinary = require("cloudinary").v2;
const sendEmail = require('../sendMail')
const jwt = require("jsonwebtoken");
require('dotenv').config();

async function doSaveUser(req,resp){
    
    const { nanoid } = await import('nanoid'); //  dynamic import for ESM module

    // Generate a random 6-character alphanumeric password
    const randomPassword = nanoid(6); // You can increase length if needed

    const userData = {
        name: req.body.name,
        email: req.body.email,
        subject: 'Franchise Approved!',
        password: randomPassword,
        message: `Congratulations ${req.body.name}, your franchise application has been approved!`,
      };


    req.body.password = randomPassword;
    var userObj = new colRef(req.body);
    try{
        const savedDoc = await userObj.save();
        const emailResult = await sendEmail(userData);
        res.json({
            status: true,
            message: "Application franchised successfully",
            emailStatus: emailResult,
            doc: savedDoc
          });
    }
    catch(err){
        resp.json({status:false,msg:err.message});
    }
}

const SEC_KEY = process.env.SEC_KEY
const doLoginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: "Email and password are required." });

    try {
        
        const user = await colRef.findOne({ email });

        if (!user)
            return res.status(404).json({ message: "User not found." });

        // Plaintext comparison (NOT recommended for production)
        if (user.password !== password)
            return res.status(401).json({ message: "Incorrect password." });

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role, name: user.name },
            SEC_KEY,
            { expiresIn: "1h" }
        );

        res.json({
            status:true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: user.pic
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

async function doUpdateUser(req, res) {
    try {
        const { id } = req.params;

         let filename = "";
        
         if (req.files==null) {
            console.log("No profile picture uploaded");
            filename = "nopic.jpg";
         }
                else{
                    const profilePic = req.files.pic;
                    filename = profilePic.name;
                    console.log("File received:", filename);
                    let path2 = path.join(__dirname,"..","uploads",filename);
                    req.files.pic.mv(path2);
        
                    await cloudinary.uploader.upload(path2).then(function(result){
                        filename = result.secure_url;
                        console.log(filename);
                    });
                }
        
                req.body.pic = filename;
             console.log(req.body);

       
        const updateData = req.body;

        // Remove empty fields to avoid overwriting with empty values
        Object.keys(updateData).forEach(key => {
            if (updateData[key] === '' || updateData[key] === null) {
                delete updateData[key];
            }
        });

        // Update user data
        const updatedUser = await colRef.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // console.log(updatedUser);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}

async function doFetchUsers(req,resp){
     const users = await colRef.find();
    resp.json(users);
}


module.exports = {doSaveUser,doLoginUser,doUpdateUser,doFetchUsers};