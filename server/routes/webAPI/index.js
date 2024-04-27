const express=require('express');
const router=express.Router();
const WebcontactRoutes=require('./WebcontactRoutes');
const WebblogArticleRoutes=require('./WebArticleRoutes');
const WebblogTagRoutes=require('./WebblogTagRoutes');
const WebMyProjectRoutes=require('./WebMyProjectRoutes');
const WebMyLifeImgRoutes=require('./WebMyLifeImgRoutes');
const WebMySkillRoutes=require('./WebMySkillRoutes');
const WebMyLifeImgCategoryRoutes=require('./WebMyLifeImgCategoryRoutes');

// 与我联系
router.use('/contact',WebcontactRoutes);

// 博客文章
router.use('/blog',WebblogArticleRoutes);

// 博客标签
router.use('/tag',WebblogTagRoutes);

// 我的项目
router.use('/project',WebMyProjectRoutes);

// 我的生活墙
router.use('/mylifeimg',WebMyLifeImgRoutes);

// 我的生活图片标签分类
router.use('/mylifeimgcategory',WebMyLifeImgCategoryRoutes);

// 我的技能
router.use('/skill',WebMySkillRoutes);


module.exports=router;