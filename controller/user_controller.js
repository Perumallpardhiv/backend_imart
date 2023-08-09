const UserService = require('../services/user_services');
const accountSid = "AC5a22ae6c3642b3ca8b283717ac82eb4e";
require('dotenv').config();
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = "VA1d4afff47414d72f227186a2288cb26e";
const client = require('twilio')(accountSid, authToken);

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const user = await UserService.checkUser(mobileno);

        if (!user) {
            const successReg = await UserService.registerUser(mobileno, device_token, name);
            let tokenData = { _id: user._id, mobileno: user.mobileno, name: user.name };
            const token = await UserService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "User Registered Successfully", token:token });
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
        const user = await UserService.checkUser(mobileno);
        if (!user) {
            res.json({ status: 0, message: "User not exist" });
            console.log("User Not Exist");
        } else {
            let tokenData = { _id: user._id, mobileno: user.mobileno, name: user.name };
            const token = await UserService.generateToken(tokenData, "secretKey", '24h');
            res.json({ status: 1, message: "User Logged Successfully", token: token });
            console.log("Logged In Successfully");
        }
    } catch (er) {
        res.json({ status: 0, message: "Logging Failed" });
        console.log("Some Error Logging Failed");
        throw er
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        let users = await UserService.getAllUsers();
        res.json({ status: 1, message: "Got all users", data:users});
        console.log("Got all users");
    } catch (er) {
        res.json({ status: 0, message: "Getting users failed" });
        console.log("Getting users failed");
        throw er
    }
}

exports.sendotp = async (req, res, next) => {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    try {
        client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: "sms" })
        .then((verification) => {
            console.log(`ver: ${verification.status}`);
            res.json({ status: 1, message: "Otp sent"});
            console.log("Otp sent");
        })
        // .then(() => {
        //     const readline = require("readline").createInterface({
        //       input: process.stdin,
        //       output: process.stdout,
        //     });
        //     readline.question("Please enter the OTP:", (otpCode) => {
        //       client.verify.v2
        //         .services(verifySid)
        //         .verificationChecks.create({ to: "+919293707007", code: otpCode })
        //         .then((verification_check) => console.log(verification_check.status))
        //         .then(() => readline.close());
        //     });
        //   });

    } catch (er) {
        res.json({ status: 0, message: er });
        console.log("Otp Sending Failed");
    }
}

exports.verifyOtp = async (req, res, next) => {
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
        res.json({ status: 0, message: er });
        console.log("Otp Wrong");
    }
}
