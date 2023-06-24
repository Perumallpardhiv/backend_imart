const CategoryModel = require('../model/category_model');

class CategoryService {
    static async addCategory(name) {
        try {
            // console.log(`id: ${id}`);
            console.log(`name: ${name}`);
            const createCategory = new CategoryModel({name});
            return await createCategory.save();
        } catch (e) {
            throw e;
        }
    }

    static async checkCategoryExist(name){
        try {
            return await CategoryModel.findOne({name});
        } catch (e) {
            throw e;
        }
    }

    static async allCategories(){
        try {
            const allCategoriesExist = await CategoryModel.find();
            return allCategoriesExist;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = CategoryService;
