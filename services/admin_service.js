const AdminModel = require('../model/admin_model');
const jwt = require('jsonwebtoken');

class AdminService {
    static async registerAdmin(mobileno, device_token, name) {
        try {
            console.log(`mobileno: ${mobileno}`);
            console.log(`device_token: ${device_token}`);
            console.log(`name: ${name}`);
            const createAdmin = new AdminModel({mobileno, device_token, name});
            return await createAdmin.save();
        } catch (e) {
            throw e;
        }
    }

    static async checkAdmin(mobileno){
        try {
            return await AdminModel.findOne({mobileno});
        } catch (e) {
            throw e;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }
}

module.exports = AdminService;
