const router = require("express").Router();
const SubCategoryController = require('../controller/subCategory_controller');

router.post('/addSubCategory',SubCategoryController.addSubCategory);
router.post('/subcategory', SubCategoryController.allSubCategories);

module.exports = router;
