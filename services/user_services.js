const UserModel = require('../model/user_model');
const jwt = require('jsonwebtoken');

class UserService {
    static async registerUser(mobileno, device_token, name) {
        try {
            console.log(`mobileno: ${mobileno}`);
            console.log(`device_token: ${device_token}`);
            console.log(`name: ${name}`);
            const createUser = new UserModel({mobileno, device_token, name});
            return await createUser.save();
        } catch (e) {
            throw e;
        }
    }

    static async checkUser(mobileno){
        try {
            return await UserModel.findOne({mobileno});
        } catch (e) {
            throw e;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire){
        return jwt.sign(tokenData, secretKey, {expiresIn: jwt_expire});
    }

    static async getAllUsers(){
        try {
            return await UserModel.find();
        } catch (e) {
            throw e;
        }
    }
}

module.exports = UserService;
