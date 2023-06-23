const ProductService = require('../services/product_services');

exports.addProduct = async(req,res,next)=>{
    try {
        const {productId, categorieId, subCategorieId, productName, description, mrpPrice, sellPrice, isWishlist, image} = req.body;
        const product = await ProductService.checkProductExist(productName);
        if(!product){
            const newProduct = await ProductService.addProduct(productId, categorieId, subCategorieId, productName, description, mrpPrice, sellPrice, isWishlist, image);
            res.json({status:1, message:"New Product Added"});
            console.log("Product added Successfully");
        } else {
            res.json({status:0, message:"Product already exist"});
            console.log("Product already Exist");
        }
        
    } catch (er) {
        res.json({status:0, message:"Adding Product failed"});
        console.log("Adding Product failed");
        throw er
    }
}

exports.allProducts = async (req,res,next)=>{
    try{
        let products = await ProductService.allProducts();

        res.json({status:1, message:"All Products fetched", data:products});
        console.log("Got all Products");
    } catch (e){
        console.log("Not found Products");
        throw e;
    }
}

exports.updateProductWishList = async (req,res,next)=>{
    try{
        const {productName, isWishlist} = req.body;
        let updatedProduct = await ProductService.updateProductWishList(productName, isWishlist);

        res.json({status:1, message:"Product WishList Updated"});
        console.log("Updated Product Wishlist");
    } catch (e){
        console.log("Not Updated");
        throw e;
    }
}

exports.getWishList = async (req,res,next)=>{
    try{
        // const {productName, isWishlist} = req.body;
        let wishListProducts = await ProductService.allWishLists();
        
        res.json({status:1, message:"Product WishList Listed", data:wishListProducts});
        console.log("Product WishList Listed");
    } catch (e){
        console.log("No WishList");
        throw e;
    }
}

exports.getProductsByCategoryId = async (req,res,next)=>{
    try{
        const {categorieId} = req.body;
        let productsByCategoryId = await ProductService.productsByCategoryId(categorieId);
        res.json({status:1, message:"Category Products Listed", data:productsByCategoryId});
        console.log("Category Products Listed");
    } catch (e){
        console.log("No Category Product");
        throw e;
    }
}

exports.getProductsBySubCategoryId = async (req,res,next)=>{
    try{
        const {categorieId, subCategorieId} = req.body;
        let productsBySubCategoryId = await ProductService.productsBySubCategoryId(categorieId, subCategorieId);
        res.json({status:1, message:"Sub Category Products Listed", data:productsBySubCategoryId});
        console.log("Sub Category Products Listed");
    } catch (e){
        console.log("No Category Product");
        throw e;
    }
}

exports.getProductDetail = async (req,res,next)=>{
    try{
        const {productId} = req.body;
        let productDetail = await ProductService.productDetail(productId);
        res.json({status:1, message:"Product details Listed", data:productDetail});
        console.log("Product details Listed");
    } catch (e){
        console.log("No Product");
        throw e;
    }
}
