const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const CategoryModel = require("./category_model")

const { Schema } = mongoose;

const subCategorySchema = new Schema({
    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true,
    // },
    categorieId:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:CategoryModel.modelName
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
});

const SubCategoryModel = db.model('subcategory', subCategorySchema);

module.exports = SubCategoryModel;
