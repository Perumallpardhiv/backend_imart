const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const OrderModel = require("./order_model")

const { Schema } = mongoose;

const orderListSchema = new Schema({
    orderId:{
        type:Schema.Types.ObjectId,
        ref:OrderModel.modelName
    },
    productName:{
        type:[String],
        required:true,
    },
    quantity:{
        type:[String],
        required:true
    },
    mrpPrice:{
        type:[String],
        required:true
    },
    sellPrice:{
        type:[String],
        required:true
    },
});

const OrderListModel = db.model('ordersItems', orderListSchema);

module.exports = OrderListModel;
