const ProductModel = require('../model/product_model');

class ProductService {
    static async addProduct(productId, categorieId, subCategorieId, productName, description, mrpPrice, sellPrice, kgOrgm, isWishlist, unit, image) {
        try {
            console.log(`id: ${productId}`);
            console.log(`name: ${productName}`);
            const createProduct = new ProductModel({productId, categorieId, subCategorieId, productName, description, mrpPrice, sellPrice, kgOrgm, isWishlist, unit, image});
            return await createProduct.save();
        } catch (e) {
            throw e;
        }
    }

    static async deleteProduct(productId) {
        try {
            console.log(`id: ${productId}`);
            const deleteProduct = await ProductModel.deleteOne({productId:productId});
            return deleteProduct;
        } catch (e) {
            throw e;
        }
    }

    static async updateProduct(productId, categorieId, subCategorieId, productName, description, mrpPrice, sellPrice, kgOrgm, isWishlist, unit, image) {
        try {
            console.log(`id: ${productId}`);
            console.log(`name: ${productName}`);
            const update =  await ProductModel.updateOne({productId:productId}, {
                $set:{
                    categorieId:categorieId,
                    subCategorieId:subCategorieId,
                    productName:productName,
                    description:description,
                    mrpPrice:mrpPrice,
                    sellPrice:sellPrice,
                    kgOrgm:kgOrgm,
                    isWishlist:isWishlist,
                    unit:unit,
                    image:image,
                }
            })
            return update;
        } catch (e) {
            throw e;
        }
    }

    static async checkProductExist(productName){
        try {
            return await ProductModel.findOne({productName});
        } catch (e) {
            throw e;
        }
    }

    static async allProducts(){
        try {
            const allProducts = await ProductModel.find();
            return allProducts;
        } catch (e) {
            throw e;
        }
    }

    static async productsByCategoryId(categorieId){
        try {
            const productsByCategoryId = await ProductModel.find({categorieId:categorieId});
            return productsByCategoryId;
        } catch (error) {
            throw error;
        }
    }

    static async productsBySubCategoryId(categorieId,subCategorieId){
        try {
            const productsBySubCategoryId = await ProductModel.find({categorieId:categorieId, subCategorieId:subCategorieId});
            return productsBySubCategoryId;
        } catch (error) {
            throw error;
        }
    }

    static async productDetail(productId){
        try {
            const productDetail = await ProductModel.findOne({productId:productId});
            return productDetail;
        } catch (error) {
            throw error;
        }
    }

    static async updateProductWishList(productName, isWishlist){
        try {
            const updateProductWishList = await ProductModel.updateOne({productName:productName}, {
                $set:{
                    isWishlist:isWishlist,
                }
            })
            return updateProductWishList;
        } catch (e) {
            throw e;
        }
    }

    static async allWishLists(){
        try {
            const updateProductWishList = (await ProductModel.find()).filter(e => e.isWishlist);
            return updateProductWishList;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = ProductService;
