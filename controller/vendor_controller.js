const VendorService = require('../services/vendor_services');
const accountSid = "AC5a22ae6c3642b3ca8b283717ac82eb4e";
require('dotenv').config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA1d4afff47414d72f227186a2288cb26e";
const client = require('twilio')(accountSid, authToken);

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const user = await VendorService.checkVendor(mobileno);
        if (!user) {
            const successReg = await VendorService.registerVendor(mobileno, device_token, name);
            let tokenData = { _id: user._id, mobileno: user.mobileno, name: user.name };
            const token = await VendorService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "Vendor Registered Successfully", token: token});
            console.log("Registered Successfully");
        } else {
            res.json({ status: 0, message: "Vendor Already exist" });
            console.log("Vendor Already Exist");
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
        const user = await VendorService.checkVendor(mobileno);
        if (!user) {
            res.json({ status: 0, message: "Vendor not exist" });
            console.log("Vendor Not Exist");
        } else {
            let tokenData = { _id: user._id, mobileno: user.mobileno, name: user.name };
            const token = await VendorService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "Vendor Logged Successfully", token: token });
            console.log("Logged In Successfully");
        }
    } catch (er) {
        res.json({ status: 0, message: "Logging Failed" });
        console.log("Some Error Logging Failed");
        throw er
    }
}

exports.getVendors = async (req, res, next) => {
    try {
        let vendors = await VendorService.getAllVendors();
        res.json({ status: 1, message: "Got all vendors", data:vendors});
        console.log("Got all vendors");
    } catch (er) {
        res.json({ status: 0, message: "Getting vendors failed" });
        console.log("Getting vendors failed");
        throw er
    }
}

exports.sendOtpVendor = async (req, res, next) => {
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

exports.verifyOtpVendor = async (req, res, next) => {
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
