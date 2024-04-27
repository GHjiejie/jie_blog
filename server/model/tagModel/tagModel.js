const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogTagSchema = new Schema({
    name: String,
    description: String,
});

const BlogTagModel=mongoose.model('blogTAg',BlogTagSchema);
module.exports=BlogTagModel;