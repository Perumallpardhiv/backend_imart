const router = require("express").Router();
const AddressController = require('../controller/address_controller');

router.post('/addAddress',AddressController.addAddress);
router.post('/getAllAddress', AddressController.allAddress);
router.post('/getDefaultAddress', AddressController.getDefaultAddress);
router.post('/updateDefaultAddress', AddressController.updateDefaultAddress);
router.post('/specificAddress', AddressController.getSpecificAddress);

module.exports = router;
