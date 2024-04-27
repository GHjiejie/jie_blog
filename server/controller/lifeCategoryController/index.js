const lifeCategoryService=require('../../services/lifeCategoryService/index.js');

const lifeCategoryController={
    addLifeCategory:async(req,res)=>{
        const {categoryName}=req.body;
        const result=await lifeCategoryService.addLifeCategory(categoryName);
        return res.json(result);
    },
    getLifeCategory:async(req,res)=>{
        const result=await lifeCategoryService.getLifeCategory();
        return res.json(result);
    },
    deleteLifeCategory:async(req,res)=>{
        
        const {id}=req.params;
        const result=await lifeCategoryService.deleteLifeCategory(id);
        return res.json(result);
    },
    updateLifeCategory:async(req,res)=>{
        const {id,category}=req.body;
        const result=await lifeCategoryService.updateLifeCategory(id,category);
        return res.json(result);
    }
}

module.exports=lifeCategoryController;