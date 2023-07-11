const router = require("express").Router();
const UserController = require('../controller/user_controller');

router.post('/registration',UserController.register);
router.post('/sendOtp',UserController.login);
router.get('/allUsers',UserController.getUsers);

module.exports = router;
