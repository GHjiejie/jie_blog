const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const mylifeSchema=new Schema({
    category:String,
    discription:String,
    lifeImg:String,
});
const mylifeModel=mongoose.model('AboutMylife',mylifeSchema);
module.exports=mylifeModel;