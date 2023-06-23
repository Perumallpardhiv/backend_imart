const router = require("express").Router();
const ProductController = require('../controller/product_controller');

router.post('/addNewProduct',ProductController.addProduct);
router.post('/products', ProductController.allProducts);
router.post('/add-wishlist', ProductController.updateProductWishList);
router.get('/wishlist-products', ProductController.getWishList);
router.post('/productByCatId', ProductController.getProductsByCategoryId);
router.post('/productBySubCatId', ProductController.getProductsBySubCategoryId);
router.post('/productDetails', ProductController.getProductDetail);

module.exports = router;
