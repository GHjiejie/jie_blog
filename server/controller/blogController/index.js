
const blogService = require('../../services/blogService');

const blogController = {

    // 添加博客(含文件上传)
    // addBlog:async(req,res)=>{
    //     // 获取现在的年份
    //     const year=new Date().getFullYear();
    //     console.log('输出现在的年份',year);
    //     // 获取现在的日期
    //     const month=new Date().toLocaleDateString();
    //     console.log('输出现在的日期',month);
    //    const {title,category,tag,author,time}=req.body;
    // //    console.log('输出用户提交的数据',title,category,tag,author,time,req.file);
    //    const result=await blogService.addBlog(title,category,tag,author,time,req.file);
    //    return res.json(result);
    // },

    // 添加博客
    addBlog:async(req,res)=>{
       const {title,category,tag,author,published,content,date,year}=req.body;
        //console.log('输出用户提交的数据',title,category,tag,author,published,date,year,content);
         const result=await blogService.addBlog(title,category,tag,author,published,date,year,content);
         return res.json(result);
     }, 
  
    // 获取所有博客
    getBlog:async(req,res)=>{
        const result=await blogService.getBlog();
        return res.json(result);
    },
    
    // 根据id获取博客详情
    getBlogDetail:async(req,res)=>{
        const {id}=req.params;
        const result=await blogService.getBlogDetail(id);
        return res.json(result);
    },

    // 根据标签获取博客列表
    getBlogByTag:async(req,res)=>{
        const {tag}=req.params;
        const result=await blogService.getBlogByTag(tag);
        return res.json(result);
    },

    // 删除博客
    deleteBlog:async(req,res)=>{
        const {id}=req.params;
        // console.log('输出用户提交的数据',id);
        const result=await blogService.deleteBlog(id);
        return res.json(result);
    },

    // 修改博客
    updateBlog:async(req,res)=>{
      const {id,content}=req.body;
    //   console.log('输出用户修改的博客内容',content);
        const result=await blogService.updateBlog(id,content);
        return res.json(result);
    },

}

module.exports = blogController;