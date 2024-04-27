const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const lifeCategorySchema=new Schema({
    categoryName:String,
});
const lifeCategoryModel=mongoose.model('AboutLifeCategory',lifeCategorySchema);
module.exports=lifeCategoryModel;