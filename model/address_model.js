const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const UserModel = require("../model/user_model")

const { Schema } = mongoose;

const addressSchema = new Schema({
     userId:{
        type:Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    firstName:{
        type:String,
        lowercase:true,
        required:true,
    },
    lastName:{
        type:String,
        lowercase:true,
        required:true,
    },
    mobileNumber:{
        type:String,
        lowercase:true,
        required:true,
    },
    address:{
        type:String,
        lowercase:true,
        required:true,
    },
    city:{
        type:String,
        lowercase:true,
        required:true,
    },
    state:{
        type:String,
        lowercase:true,
        required:true,
    },
    country:{
        type:String,
        lowercase:true,
        required:true,
    },
    zipCode:{
        type:String,
        lowercase:true,
        required:true,
    },
    isDefault:{
        type:Number,
        required:true
    },
});

const AddressModel = db.model('address', addressSchema);

module.exports = AddressModel;
