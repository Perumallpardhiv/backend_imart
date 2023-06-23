const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const db = require('../config/db');

const { Schema } = mongoose;

const userSchema = new Schema({
    mobileno:{
        type:String,
        required:true,
        unique:true,
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
userSchema.methods.comparePhone = async function(phoneNum){
    try {
        const isMatch = await bcrypt.compare(phoneNum, this.mobileno);
        return isMatch;
    } catch (e) {
        throw e;
    }
};

const UserModel = db.model('user', userSchema);

module.exports = UserModel;
