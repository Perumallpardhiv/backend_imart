const CartModel = require('../model/cart_model');

class CartService {
    static async addProductToCart(productId, quantity) {
        try {
            console.log(`productId: ${productId}`);
            console.log(`quantity: ${quantity}`);
            const addToCart = new CartModel({productId, quantity});
            return await addToCart.save();
        } catch (e) {
            throw e;
        }
    }

    static async chackCartExist(productId){
        try {
            return await CartModel.findOne({productId});
        } catch (e) {
            throw e;
        }
    }

    static async allCartProducts(){
        try {
            const allCartProducts = await CartModel.find();
            return allCartProducts;
        } catch (e) {
            throw e;
        }
    }

    static async incCartItemQuantity(productId){
        try {
            const incCartItemQuantity = await CartModel.updateOne({productId:productId}, {
                $inc:{
                    quantity:1,
                }
            })
            return incCartItemQuantity;
        } catch (e) {
            throw e;
        }
    }

    static async decCartItemQuantity(productId){
        try {
            const decCartItemQuantity = await CartModel.updateOne({productId:productId}, {
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
