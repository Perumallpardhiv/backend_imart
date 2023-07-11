const VendorModel = require('../model/vendor_model');
const jwt = require('jsonwebtoken');

class VendorService {
    static async registerVendor(mobileno, device_token, name) {
        try {
            console.log(`mobileno: ${mobileno}`);
            console.log(`device_token: ${device_token}`);
            console.log(`name: ${name}`);
            const createUser = new VendorModel({mobileno, device_token, name});
            return await createUser.save();
        } catch (e) {
            throw e;
        }
    }

    static async checkVendor(mobileno){
        try {
            return await VendorModel.findOne({mobileno});
        } catch (e) {
            throw e;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }

    static async getAllVendors(){
        try {
            return await VendorModel.find();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = VendorService;
