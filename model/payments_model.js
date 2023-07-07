const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const UserModel = require("./user_model")
const OrderModel = require("./order_model")

const { Schema } = mongoose;

const paymentSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    orderId:{
        type:Schema.Types.ObjectId,
        ref:OrderModel.modelName
    },
    name:{
        type:String,
        required:true,
    },
    grandTotal:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    paymentdate:{
        type:String,
        required:true,
    },
});

const PaymentModel = db.model('payment', paymentSchema);

module.exports = PaymentModel;
