const CartModel = require('../model/cart_model');

class CartService {
    static async addProductToCart(userId, productId, quantity) {
        try {
            console.log(`userId: ${userId}`);
            console.log(`productId: ${productId}`);
            console.log(`quantity: ${quantity}`);
            const addToCart = new CartModel({userId, productId, quantity});
            return await addToCart.save();
        } catch (e) {
            throw e;
        }
    }

    static async chackCartExist(userId, productId){
        try {
            return await CartModel.findOne({userId:userId, productId:productId});
        } catch (e) {
            throw e;
        }
    }

    static async allCartProducts(userId){
        try {
            const allCartProducts = await CartModel.find({userId});
            return allCartProducts;
        } catch (e) {
            throw e;
        }
    }

    static async incCartItemQuantity(userId, productId){
        try {
            const incCartItemQuantity = await CartModel.updateOne({userId:userId, productId:productId}, {
                $inc:{
                    quantity:1,
                }
            })
            return incCartItemQuantity;
        } catch (e) {
            throw e;
        }
    }

    static async decCartItemQuantity(userId, productId){
        try {
            const decCartItemQuantity = await CartModel.updateOne({userId:userId, productId:productId}, {
                $inc:{
                    quantity:-1,
                }
            })
            return decCartItemQuantity;
        } catch (e) {
            throw e;
        }
    }

    static async deleteCartItem(id){
        try {
            const deleteItem = await CartModel.findByIdAndRemove(id);
            return deleteItem;
        } catch (er) {
            throw er;
        }
    }
}

module.exports = CartService;
