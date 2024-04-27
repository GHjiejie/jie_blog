const express=  require('express');
const router = express.Router();
const lifeCategoryController=require('../../controller/lifeCategoryController/index');
// 获取生活分类列表
router.get('/',lifeCategoryController.getLifeCategory);

// 添加生活分类
router.post('/',lifeCategoryController.addLifeCategory);

// 删除生活分类
router.delete('/:id',lifeCategoryController.deleteLifeCategory);

// 修改生活分类
router.put('/',lifeCategoryController.updateLifeCategory);

module.exports = router;
