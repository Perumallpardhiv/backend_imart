const CartService = require('../services/cart_services');

exports.addToCart = async(req,res,next)=>{
    try {
        const {productId, quantity} = req.body;
        const alreadyExist = await CartService.chackCartExist(productId);
        if(!alreadyExist){
            const newProduct = await CartService.addProductToCart(productId, quantity);
            res.json({status:1, message:"New Product Added"});
            console.log("Product added Successfully");
        } else {
            const updateProductQuantity = await CartService.incCartItemQuantity(productId);
            res.json({status:1, message:"Product Quantity Updated"});
            console.log("Updated Product Quantity");
        }
    } catch (er) {
        res.json({status:0, message:"Adding To Cart failed"});
        console.log("Adding To Cart failed");
        throw er
    }
}

exports.incToCart = async(req,res,next)=>{
    try {
        const {productId} = req.body;
        const alreadyExist = await CartService.chackCartExist(productId);
        if(!alreadyExist){
            res.json({status:0, message:"Cart not exist"});
            console.log("Cart Not Exist");
        } else {
            const updateProductQuantity = await CartService.incCartItemQuantity(productId);
            res.json({status:1, message:"Product Quantity Updated"});
            console.log("Updated Product Quantity");
        }
    } catch (er) {
        res.json({status:0, message:"Updating To Cart failed"});
        console.log("Updating To Cart failed");
        throw er
    }
}

exports.decToCart = async(req,res,next)=>{
    try {
        const {productId} = req.body;
        const alreadyExist = await CartService.chackCartExist(productId);
        if(!alreadyExist){
            res.json({status:0, message:"Cart not exist"});
            console.log("Cart Not Exist");
        } else {
            const updateProductQuantity = await CartService.decCartItemQuantity(productId);
            res.json({status:1, message:"Product Quantity Updated"});
            console.log("Updated Product Quantity");
        }
    } catch (er) {
        res.json({status:0, message:"Updating To Cart failed"});
        console.log("Updating To Cart failed");
        throw er
    }
}

exports.allCart = async (req,res,next)=>{
    try{
        let products = await CartService.allCartProducts();

        res.json({status:1, message:"All Cart Products fetched", data:products});
        console.log("Got all Cart");
    } catch (e){
        console.log("Not found Cart");
        throw e;
    }
}

exports.deleteCart = async (req,res,next)=>{
    try{
        const {id} = req.body;
        let deleteCartItem = await CartService.deleteCartItem(id);
        
        if(deleteCartItem){
            res.json({status:1, message:"Removed from cart"});
            console.log("Removed from cart");
        } else {
            res.json({status:0, message:"No removed"});
            console.log("Not Removed from cart");
        }
    } catch (e){
        console.log("Some error");
        throw e;
    }
}
