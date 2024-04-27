const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const myskillSchema=new Schema({
    discription:String,
    skillImg:String,
});
const myskillModel=mongoose.model('AboutMyskill',myskillSchema);
module.exports=myskillModel;