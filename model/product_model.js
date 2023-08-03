const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const CategoryModel = require("./category_model")
const SubCategoryModel = require("./subCategory_model")

const { Schema } = mongoose;

const productSchema = new Schema({
    productId:{
        type:Number,
        required:true,
        unique:true
    },
    categorieId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:CategoryModel.modelName
    },
    subCategorieId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:SubCategoryModel.modelName
    },
    productName:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    description:{
        type:String,
        lowercase:true,
        required:true,
    },
    mrpPrice:{
        type:String,
        required:true
    },
    sellPrice:{
        type:String,
        required:true
    },
    kgOrgm:{
        type:String,
        required:true,
    },
    isWishlist:{
        type:Number,
        required:true
    },
    unit:{
        type:Number,
        required:true
    },
    image:{
        type:[String],
        required:true
    }
});

// for searching product
productSchema.methods.compareName = async function(productName){
    try {
        const isMatch = await bcrypt.compare(productName, this.productName);
        return isMatch;
    } catch (e) {
        throw e;
    }
};

const ProductModel = db.model('product', productSchema);

module.exports = ProductModel;
