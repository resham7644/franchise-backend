var mongoose = require("mongoose");

function getSalesModel(){
    var salesSchema =  mongoose.Schema;

    var salesColSchema = {
         product: { type: mongoose.Schema.Types.ObjectId, ref: 'productCollection',  },
         employee: { type: mongoose.Schema.Types.ObjectId, ref: 'employeeCollection',  },
        // product: { type: String, ref: 'Product',  },
        // employee: { type: String, ref: 'Employee',  },
        quantity: Number,
        totalAmount: Number,
        date: { type: Date, default: Date.now },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }
    var version = {
        versionKey:false,   // to avoid __v field in table come by default
    }

    var colSchema = new salesSchema(salesColSchema,version);
    var colRef = mongoose.model("salesCollection",colSchema);  //creating collection
    return colRef;
}
module.exports = {getSalesModel};