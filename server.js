var express = require("express");
var mongoose = require("mongoose");
var fileuploader = require("express-fileupload");
var path = require("path");
var {url} = require("./config/config");
var cors = require('cors');
var cloudinary = require("cloudinary").v2;
require('dotenv').config();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

var app = express();

app.use(cors());
app.use(fileuploader());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 2004;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


let urll = url;

mongoose.connect(urll).then(
    ()=>{
        console.log("Connected");
    }).catch((err)=>{
        console.log(err.message);
    })

var formRouter = require("./routers/formRouter");
app.use("/form",formRouter);
var userRouter = require("./routers/userRouter");
app.use("/user",userRouter);
var salesRouter = require('./routers/salesRouter');
app.use("/sales",salesRouter);
var employeeRouter = require('./routers/employeeRouter');
app.use("/employee",employeeRouter);
const productRouter = require("./routers/productRouter");
app.use("/product",productRouter);