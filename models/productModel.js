var mongoose = require("mongoose");

function getProductModel(){
    var productSchema =  mongoose.Schema;

    var productColSchema = {
        name: { type: String, required: true },
        price: Number,
        code: String,
        uploadedBy: { type: mongoose.Schema.Types.ObjectId }
    }
    var version = {
        versionKey:false,   // to avoid __v field in table come by default
    }

    var colSchema = new productSchema(productColSchema,version);
    
    var colRef = mongoose.model("productCollection",colSchema);  //creating collection
    return colRef;
}

module.exports = {getProductModel};