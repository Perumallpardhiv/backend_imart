const CartService = require('../services/cart_services');

exports.addToCart = async(req,res,next)=>{
    try {
        const {userId, productId, quantity} = req.body;
        const alreadyExist = await CartService.chackCartExist(userId, productId);
        if(!alreadyExist){
            const newProduct = await CartService.addProductToCart(userId, productId, quantity);
            res.json({status:1, message:"New Product Added"});
            console.log("Product added Successfully");
        } else {
            const updateProductQuantity = await CartService.incCartItemQuantity(userId, productId);
            res.json({status:1, message:"Product Quantity Updated"});
            console.log("Updated Product Quantity");
        }
    } catch (er) {
        res.json({status:0, message:"Adding To Cart failed"});
        console.log("Adding To Cart failed");
        throw er
    }
}

exports.checkCartExist = async(req,res,next)=>{
    try {
        const {userId, productId} = req.body;
        const alreadyExist = await CartService.chackCartExist(userId, productId);
        if(alreadyExist){
            res.json({status:1, message:"Exist in Cart", data:alreadyExist});
            console.log("Exist in Cart");
        }
    } catch (er) {
        res.json({status:0, message:"Checking Cart failed"});
        console.log("Checking Cart failed");
        throw er
    }
}

exports.incToCart = async(req,res,next)=>{
    try {
        const {userId, productId} = req.body;
        const alreadyExist = await CartService.chackCartExist(userId, productId);
        if(!alreadyExist){
            res.json({status:0, message:"Cart not exist"});
            console.log("Cart Not Exist");
        } else {
            const updateProductQuantity = await CartService.incCartItemQuantity(userId, productId);
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
        const {userId, productId} = req.body;
        const alreadyExist = await CartService.chackCartExist(userId, productId);
        if(!alreadyExist){
            res.json({status:0, message:"Cart not exist"});
            console.log("Cart Not Exist");
        } else {
            const updateProductQuantity = await CartService.decCartItemQuantity(userId, productId);
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
        const {userId} = req.body;
        let products = await CartService.allCartProducts(userId);

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
