var mongoose = require('mongoose');
// var bcrypt = require('bcrypt'); // for password hashing
var jwt = require('jsonwebtoken'); // for token generation

function getUserModel(){
    var userSchema = mongoose.Schema;

    var usercolSchema = {
        name: { type: String,  },
        email: { type: String, },
        password: { type: String },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
        status: { type: Number, default: 0 },
        doa: { type: Date, default: Date.now },
        pic: { type:String, },
    };

    var version = {
        versionKey:false,   // to avoid __v field in table come by default
    }

    var colSchema = new userSchema(usercolSchema,version);

    var colRef = mongoose.model("userCollection",colSchema);  //creating collection
        return colRef;
}

module.exports = {getUserModel};