const express = require('express');
const router = express.Router();
const blogTagController = require('../../controller/blogTagController/index');

// 验证标签是否存在
router.get('/vaildate', blogTagController.checkTagExist);

// 获取所有的指定标签的博客列表(不使用这个接口)
router.get('/', blogTagController.getBlogTagList);

// 添加标签
router.post('/', blogTagController.addBlogTag);

// 删除标签
router.delete('/:tagId', blogTagController.deleteBlogTag);

// 修改标签
router.put('/:tagId', blogTagController.updateBlogTag);

module.exports = router;
