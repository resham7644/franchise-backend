var mongoose = require("mongoose");

function getFranchiseModel(){
    var formSchema =  mongoose.Schema;

    var formcolSchema = {
        name:{type:String,required:true},
        email:{type:String,required:true,index:true,unique:true},
        cont:{type:String},
        buisness:String,
        address:String,
        city:String,
        pincode:String,
        area:String,
        ownership:String,
        idProof:String,
        status: { type: Number, default: 0 },
        doa:{type:Date,default:Date.now},
    }
    var version = {
        versionKey:false,   // to avoid __v field in table come by default
    }

    var colSchema = new formSchema(formcolSchema,version);
    
    var colRef = mongoose.model("franFormCollection",colSchema);  //creating collection
    return colRef;
}

module.exports = {getFranchiseModel};