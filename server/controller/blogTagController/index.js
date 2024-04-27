
const blogTagServices = require('../../services/blogTagService/index');

const blogTagController={
    // 验证标签是否存在
   checkTagExist:async function(req,res,next){
        // console.log(req.query);
         const tagName=req.query.name;
         const result=await blogTagServices.checkTagExist(tagName);
         res.json(result);
    },
    // 获取标签列表
    getBlogTagList:async function(req,res,next){
        const result=await blogTagServices.getBlogTagList();
        res.json(result);
    },
    // 添加标签
    addBlogTag:async function(req,res,next){
        const blogTag=req.body;
        const result=await blogTagServices.addBlogTag(blogTag);
        res.json(result);
    },
    // 删除标签
    deleteBlogTag:async function(req,res,next){
        const tagId=req.params.tagId;
        const result=await blogTagServices.deleteBlogTag(tagId);
        res.json(result);
    },
    // 修改标签
    updateBlogTag:async function(req,res,next){
        const tagId=req.params.tagId;
        const blogTag=req.body;
        const result=await blogTagServices.updateBlogTag(tagId,blogTag);
        res.json(result);
    },
}
module.exports=blogTagController;