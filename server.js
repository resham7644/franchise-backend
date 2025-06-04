var express = require("express");
var mongoose = require("mongoose");
var fileuploader = require("express-fileupload");
var path = require("path");
var {url} = require("./config/config");
var cors = require('cors');
var cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'doeunlxxa', 
    api_key: '875193351841854', 
    api_secret: 'u6wtPrtZ6rTvDFC0hUiT7aenc9o' // Click 'View API Keys' above to copy your API secret
});

var app = express();

app.use(cors());
app.use(fileuploader());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(2004,()=>{
    console.log("Server Started");
})

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