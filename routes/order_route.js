const router = require("express").Router();
const OrderController = require('../controller/order_controller');

router.post('/placeorder',OrderController.addOrder);
router.post('/allUserOrders', OrderController.allUserOrders);
router.post('/allOrders', OrderController.allOrders);
router.post('/orderStatus', OrderController.orderStatus);

module.exports = router;
