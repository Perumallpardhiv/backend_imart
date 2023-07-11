const UserService = require('../services/user_services');

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const user = await UserService.checkUser(mobileno);

        if (!user) {
            const successReg = await UserService.registerUser(mobileno, device_token, name);
            res.json({ status: 1, message: "User Registered Successfully" });
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
