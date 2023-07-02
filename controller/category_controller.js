const CategoryService = require('../services/category_services');

exports.addCategory = async(req,res,next)=>{
    try {
        const {name} = req.body;
        const category = await CategoryService.checkCategoryExist(name);
        if(!category){
            const newCategory = await CategoryService.addCategory(name);
            res.json({status:1, message:"New Category Added"});
            console.log("Category added Successfully");
        } else {
            res.json({status:0, message:"Category already exist"});
            console.log("Category already Exist");
        }
    } catch (er) {
        res.json({status:0, message:"Adding Category failed"});
        console.log("Adding category failed");
        throw er
    }
}

exports.allCategories = async (req,res,next)=>{
    try{
        let categories = await CategoryService.allCategories();

        res.json({status:1, message:"All Categories fetched", data:categories});
        console.log("Got all Categories");
    } catch (e){
        console.log("Not found categories");
        throw e;
    }
}

exports.specificCategory = async (req,res,next)=>{
    try{
        const {id} = req.body;
        let specificCategory = await CategoryService.getSpecificCategory(id);
        res.json({status:1, message:"Category fetched", data:specificCategory});
        console.log("Got Category");
    } catch (e){
        console.log("Not found category");
        throw e;
    }
}
