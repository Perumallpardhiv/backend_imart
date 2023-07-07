const router = require("express").Router();
const PaymentController = require('../controller/payments_controller');

router.post('/addpayment',PaymentController.addpayment);
router.post('/allpayments', PaymentController.allpayments);

module.exports = router;
