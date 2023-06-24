const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const categorySchema = new Schema({
    // id:{
    //     type:Number,
    //     required:true,
    //     unique:true
    // },
    name:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
});

// for searching category
categorySchema.methods.compareName = async function(name){
    try {
        const isMatch = await bcrypt.compare(name, this.name);
        return isMatch;
    } catch (e) {
        throw e;
    }
};

const CategoryModel = db.model('category', categorySchema);

module.exports = CategoryModel;
