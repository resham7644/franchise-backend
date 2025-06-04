var {franchiseFormModel, getFranchiseModel} = require("../models/franchiseFormModel");
const cloudinary = require("cloudinary").v2;
var colRef = getFranchiseModel();
var path = require("path");

async function doSaveFormPost(req,resp){
    // console.log("Received files:", req.files);
    let filename = "";

        if(req.files==null)
        {
            filename = "nopic.jpg";
        }
        else{
            filename = req.files.idProof.name;
            let path2 = path.join(__dirname,"..","uploads",filename);
            req.files.idProof.mv(path2);

            await cloudinary.uploader.upload(path2).then(function(result){
                filename = result.secure_url;
                console.log(filename);
            });
        }

        req.body.idProof = filename;
     console.log(req.body);

    var formObj = new colRef(req.body);

    formObj.save().then((document)=>{
        resp.json({doc:document,status:true,msg:"Saved Successfully"});
    }).catch((err)=>{
        resp.json({status:false,msg:err.message});
    })
}

async function doFetchAll(req,resp){
    const items = await colRef.find();
    resp.json(items);
}

async function doAccept(req,res){
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ status: false, msg: "ID is required" });

        const updatedDoc = await colRef.findByIdAndUpdate(id, { status: 1 }, { new: true });

        if (!updatedDoc) return res.status(404).json({ status: false, msg: "Application not found" });

        res.json({ status: true, msg: "Application Accepted", data: updatedDoc });
    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

async function doReject(req,res){
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ status: false, msg: "ID is required" });
        
        const updatedDoc = await colRef.findByIdAndUpdate(id, { status: 2 }, { new: true });

        if (!updatedDoc) return res.status(404).json({ status: false, msg: "Application not found" });

        res.json({ status: true, msg: "Application Rejected", data: updatedDoc });
    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

async function doFranchise(req,res){
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ status: false, msg: "ID is required" });
        
        const updatedDoc = await colRef.findByIdAndUpdate(id, { status: 3 }, { new: true });

        if (!updatedDoc) return res.status(404).json({ status: false, msg: "Application not found" });

        res.json({ status: true, msg: "Application Franchised", data: updatedDoc });
    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

async function doDelete(req, res) {
    try {
        const { id } = req.body; // Extract ID from URL params
        const deletedDoc = await colRef.findByIdAndDelete(id); // Delete from DB

        if (!deletedDoc) {
            return res.status(404).json({ status: false, msg: "Application not found" });
        }

        res.json({ status: true, msg: "Application Deleted Successfully", data: deletedDoc });
    } catch (err) {
        res.status(500).json({ status: false, msg: err.message });
    }
}

module.exports = { doDelete };

module.exports={doSaveFormPost,doFetchAll,doAccept,doReject,doDelete,doFranchise};