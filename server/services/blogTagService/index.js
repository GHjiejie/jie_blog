const BlogTagModel = require('../../model/tagModel/tagModel');

const blogTagServices = {

    // 验证标签是否存在
    checkTagExist: async function (tagName) {
        const result = await BlogTagModel.findOne({ name: tagName });
        return resultCheck(result);
    },
    // 获取标签列表
    getBlogTagList: async function () {
        const result = await BlogTagModel.find();
        return resultCheck(result);
    },

    // 添加标签
    addBlogTag: async function (blogTag) {
        const result = await BlogTagModel.create(blogTag);
          return resultCheck(result);
    },
    // 删除标签

    deleteBlogTag: async function (tagId) {
        const result = await BlogTagModel.findByIdAndDelete(tagId);
            return resultCheck(result);
    },
    // 修改标签
    updateBlogTag: async function (tagId, blogTag) {
        const result=await BlogTagModel.updateOne({_id:tagId},blogTag);
        return resultCheck(result);
    }
}
const resultCheck=(result)=>{
    if(result){
        return {
            code:200,
            data:result,
            msg:'success'
        }
    }else{
        return {
            code:500,
            data:null,
            msg:'error'
        }
    }
}

module.exports = blogTagServices;
