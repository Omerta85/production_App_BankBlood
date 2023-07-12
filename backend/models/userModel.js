const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    role:{
        type:String,
        required:[true,'role is required'],
        enum:['admin', 'organization', 'donor', 'hospital']
    },
    name:{
        type:String,
        required: function() {
            return this.role === 'user' || this.role === 'admin';
        }
    },
    organizationName:{
        type:String,
        required: function () {
            return this.role === 'organization';
        }
    },
    hospitalName:{
        type:String,
        required: function () {
            return this.role === 'hospital';
        }
    },
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    website:{
        type:String
    },
    address:{
        type:String,
        required:[true, 'address is required']
    },
    phone:{
        type:String,
        required:[true, 'phone number is required']
    }
}, {timestamps:true});

module.exports = mongoose.model("users", userSchema);