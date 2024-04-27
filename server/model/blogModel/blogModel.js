const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const BlogSchema=new Schema({
    title:String,
    author:String,
    published:String,
    date:String,
    year:String,
    category:String,
    tag:String,
    content:Object,
});
const BlogModel=mongoose.model('blog',BlogSchema);
module.exports=BlogModel;