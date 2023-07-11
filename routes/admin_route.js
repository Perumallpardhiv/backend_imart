const router = require("express").Router();
const AdminController = require('../controller/admin_controller');

router.post('/adminRegister',AdminController.register);
router.post('/adminLogin',AdminController.login);

module.exports = router;
