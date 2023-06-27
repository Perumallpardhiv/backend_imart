const router = require("express").Router();
const CartController = require('../controller/cart_controller');

router.post('/add/cart',CartController.addToCart);
router.post('/inc/cart',CartController.incToCart);
router.post('/check/cart',CartController.checkCartExist);
router.post('/dec/cart',CartController.decToCart);
router.post('/cart', CartController.allCart);
router.post('/delete/cart', CartController.deleteCart);

module.exports = router;
