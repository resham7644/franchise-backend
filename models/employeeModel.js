var mongoose = require("mongoose");

function getEmployeeModel(){
    var employeeSchema =  mongoose.Schema;

    var employeeColSchema = {
        name: { type: String, required: true },
        role: String,
        contact: String,
        uploadedBy: { type: mongoose.Schema.Types.ObjectId }
    }
    var version = {
        versionKey:false,   // to avoid __v field in table come by default
    }

    var colSchema = new employeeSchema(employeeColSchema,version);
    var colRef = mongoose.model("employeeCollection",colSchema);  //creating collection
    return colRef;
}
module.exports = {getEmployeeModel};