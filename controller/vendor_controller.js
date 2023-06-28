const VendorService = require('../services/vendor_services');

exports.register = async (req, res, next) => {
    try {
        const { mobileno, device_token, name } = req.body;
        const user = await VendorService.checkVendor(mobileno);
        if (!user) {
            const successReg = await VendorService.registerVendor(mobileno, device_token, name);
            res.json({ status: 1, message: "Vendor Registered Successfully" });
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
