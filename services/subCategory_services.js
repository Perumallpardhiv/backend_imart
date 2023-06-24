const SubCategoryModel = require('../model/subCategory_model');

class SubCategoryService {
    static async addSubCategory(categorieId, name, description) {
        try {
            console.log(`categorieId: ${categorieId}`);
            console.log(`name: ${name}`);
            console.log(`description: ${description}`);
            const createProduct = new SubCategoryModel({categorieId, name, description});
            return await createProduct.save();
        } catch (e) {
            throw e;
        }
    }

    static async allSubCategories(categorieId){
        try {
            const allSubCategories = await SubCategoryModel.find({categorieId:categorieId});
            return allSubCategories;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = SubCategoryService;
