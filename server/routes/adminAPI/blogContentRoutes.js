const express=require('express');
const router=express.Router();
const blogController=require('../../controller/blogController/index');
const multer = require('multer'); // 导入multer模块
const path = require('path');

const year=new Date().getFullYear();
const date=new Date().toLocaleDateString();
// 工具日期动态创建文件夹
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, `../public/uploads/${year}/${date}`))
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + '-' + file.originalname)
//     }
//   })
// const upload = multer({dest: path.join(__dirname, '../public/uploads')});

// 添加博客(含文件上传)
// router.post('',upload.single('content'), blogController.addBlog);

// 添加博客
router.post('', blogController.addBlog);

// 获取博客列表
router.get('',blogController.getBlog);

// 根据id获取博客详情
router.get('/:id',blogController.getBlogDetail);

// 根据标签获取博客列表
router.get('/tag/:tag',blogController.getBlogByTag);

//删除博客
router.delete('/:id',blogController.deleteBlog);

//修改博客
router.put('',blogController.updateBlog);

module.exports=router;