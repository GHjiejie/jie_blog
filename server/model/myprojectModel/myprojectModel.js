const mongoose  =require('mongoose');
const Schema    =mongoose.Schema;
const myprojectSchema=new Schema({
    discription:String,
    projectImg:String,
});
const myprojectModel=mongoose.model('AboutMyproject',myprojectSchema);
module.exports=myprojectModel;
