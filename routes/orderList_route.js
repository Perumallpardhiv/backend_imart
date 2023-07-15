const router = require("express").Router();
const OrderListController = require('../controller/orderList_controller');

router.post('/addOrderList', OrderListController.addOrderList);
router.post('/orderListSpecificOrder', OrderListController.orderListSpecificOrder);

module.exports = router;
