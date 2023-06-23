const SubCategoryService = require('../services/subCategory_services');

exports.addSubCategory = async(req,res,next)=>{
    try {
        const {id, categorieId, name, description} = req.body;
        const newProduct = await SubCategoryService.addSubCategory(id, categorieId, name, description);
        res.json({status:1, message:"New SubCategory Added"});
        console.log("SubCategory added Successfully");
    } catch (er) {
        res.json({status:0, message:"Adding SubCategory failed"});
        console.log("Adding SubCategory failed");
        throw er;
    }
}

exports.allSubCategories = async (req,res,next)=>{
    try{
        const {categorieId} = req.body;
        let products = await SubCategoryService.allSubCategories(categorieId);
        res.json({status:1, message:"All SubCategories fetched", data:products});
        console.log("Got all SubCategories");
    } catch (e){
        console.log("Not found SubCategories");
        throw e;
    }
}
