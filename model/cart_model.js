const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const cartSchema = new Schema({
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
