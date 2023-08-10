const AdminService = require('../services/admin_service');
const accountSid = "AC5a22ae6c3642b3ca8b283717ac82eb4e";
require('dotenv').config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA1d4afff47414d72f227186a2288cb26e";
const client = require('twilio')(accountSid, authToken);

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const admin = await AdminService.checkAdmin(mobileno);

        if (!admin) {
            const successReg = await AdminService.registerAdmin(mobileno, device_token, name);
            let tokenData = { _id: successReg._id, mobileno: successReg.mobileno, name: successReg.name };
            const token = await AdminService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "Admin Registered Successfully", token: token});
            console.log("Registered Successfully");
        } else {
            res.json({ status: 0, message: "User Already exist" });
            console.log("User Already Exist");
        }
    } catch (er) {
        res.json({ status: 0, message: "Registration failed" });
        console.log("Registration failed");
        throw er
    }
}

exports.login = async (req, res, next) => {
    try {
        const { mobileno, device_token } = req.body;
        const admin = await AdminService.checkAdmin(mobileno);
        if (!admin) {
            res.json({ status: 0, message: "Admin not exist" });
            console.log("Admin Not Exist");
        } else {
            let tokenData = { _id: admin._id, mobileno: admin.mobileno, name: admin.name };
            const token = await AdminService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "Admin Logged Successfully", token: token });
            console.log("Logged In Successfully");
        }
    } catch (er) {
        res.json({ status: 0, message: "Logging Failed" });
        console.log("Some Error Logging Failed");
        throw er
    }
}

exports.sendOtpadmin = async (req, res, next) => {
    const { phoneNumber } = req.body;
    try {
        client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((verification) => {
            console.log(`ver: ${verification.status}`);
            res.json({ status: 1, message: "Otp sent"});
            console.log("Otp sent");
        })
    } catch (er) {
        res.json({ status: 0, message: er });
        console.log("Otp Sending Failed");
    }
}

exports.verifyOtpadmin = async (req, res, next) => {
    const { phoneNumber, otpCode } = req.body;
    try {
        client.verify.v2
        .services(verifySid)
        .verificationChecks.create({ to: phoneNumber, code: otpCode })
        .then((verification_check) => {
            console.log(`ver: ${verification_check.status}`);
            res.json({ status: 1, message: "Otp verified"});
            console.log("Otp verified");
        })
    } catch (er) {
        res.json({ status: 0, message: "Otp Wrong"});
        console.log("Otp Wrong");
    }
}
