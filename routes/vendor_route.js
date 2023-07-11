const router = require("express").Router();
const VendorController = require('../controller/vendor_controller');

router.post('/vendorRegister',VendorController.register);
router.post('/vendorLogin',VendorController.login);
router.get('/allVendors', VendorController.getVendors);

module.exports = router;
