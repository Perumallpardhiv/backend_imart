const router = require("express").Router();
const CategoryController = require('../controller/category_controller');

router.post('/addNewCategory',CategoryController.addCategory);
router.post('/specificCategory',CategoryController.specificCategory);
router.get('/category', CategoryController.allCategories);

module.exports = router;
