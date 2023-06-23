const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const UserModel = require("./user_model")
const AddressModel = require("./address_model")

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    addressId:{
        type:Schema.Types.ObjectId,
        ref:AddressModel.modelName
    },
    name:{
        type:String,
        required:true,
    },
    subTotal:{
        type:String,
        required:true
    },
    discoutPrice:{
        type:String,
        required:true
    },
    grandTotal:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    }
});

const OrderModel = db.model('orders', orderSchema);

module.exports = OrderModel;
