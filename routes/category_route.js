const router = require("express").Router();
const CategoryController = require('../controller/category_controller');

router.post('/addNewCategory',CategoryController.addCategory);
router.get('/category', CategoryController.allCategories);

module.exports = router;
