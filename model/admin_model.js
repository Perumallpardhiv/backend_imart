const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const adminSchema = new Schema({
    mobileno:{
        type:String,
        required:true,
    },
    device_token:{
        type:String,
        required:true
    },
    name:{
        type:String,
        lowercase:true,
    },
});

// for login
adminSchema.methods.comparePhone = async function(phoneNum){
    try {
        const isMatch = await bcrypt.compare(phoneNum, this.mobileno);
        return isMatch;
    } catch (e) {
        throw e;
    }
};

const AdminModel = db.model('admin', adminSchema);

module.exports = AdminModel;
