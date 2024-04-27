const blogContentRoutes=require('./blogContentRoutes');
const blogTagRoutes=require('./blogTagRoutes');
const contactRoutes=require('./contactRoutes');
const userRoutes=require('./userRoutes');
const MyLifeImgRoutes=require('./MyLifeImgRoutes');
const MyLifeImgCategoryRoutes=require('./MyLifeImgCategoryRoutes');
const MySkillRoutes=require('./MySkillRoutes');
const uploadRoutes=require('./uploadRoutes');
const router=require('express').Router();
router.use('/blog',blogContentRoutes);
router.use('/tag',blogTagRoutes);
router.use('/contact',contactRoutes);
router.use('/user',userRoutes);
router.use('/mylifeimg',MyLifeImgRoutes);
router.use('/mylifeimgcategory',MyLifeImgCategoryRoutes);
router.use('/myskill',MySkillRoutes);
router.use('/upload',uploadRoutes);
module.exports=router;