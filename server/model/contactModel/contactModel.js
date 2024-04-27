const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const contactSchema=new Schema({
    name:String,
    email:String,
    time:String,
    feedback:String,
});
const ContactModel=mongoose.model('feedbackMSG',contactSchema);
module.exports=ContactModel;