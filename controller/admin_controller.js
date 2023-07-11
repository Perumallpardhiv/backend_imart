const AdminService = require('../services/admin_service');

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const admin = await AdminService.checkAdmin(mobileno);

        if (!admin) {
            const successReg = await AdminService.registerAdmin(mobileno, device_token, name);
            res.json({ status: 1, message: "Admin Registered Successfully" });
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
