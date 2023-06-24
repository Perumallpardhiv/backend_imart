const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const UserModel = require("./user_model")

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:UserModel.modelName
    },
    productId:{
        type:Number,
        required:true,
        unique:true
    },
    quantity:{
        type:Number,
        required:true
    },
});

// for increasing quantity
cartSchema.methods.compareName = async function(productId){
    try {
        const isMatch = await bcrypt.compare(productId, this.productId);
        return isMatch;
    } catch (e) {
        throw e;
    }
};

const CartModel = db.model('cart', cartSchema);

module.exports = CartModel;
