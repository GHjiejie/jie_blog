const lifeCategoryModel=require('../../model/lifeCategory/lifeCategory.js');
const lifeCategoryService={
    addLifeCategory:async(category)=>{
        const lifeCategory=new lifeCategoryModel({
            categoryName:category,
        });
        const result=await lifeCategory.save();
        return result;
    },
    getLifeCategory:async()=>{
        const result=await lifeCategoryModel.find();
        return result;
    },
    deleteLifeCategory:async(id)=>{
        const result=await lifeCategoryModel.findByIdAndDelete(id);
        return result;
    },
    updateLifeCategory:async(id,category)=>{
        const result=await lifeCategoryModel.findByIdAndUpdate(id,{category:category});
        return result;
    }
}

module.exports=lifeCategoryService;