const express = require('express');
const router = express.Router();

// 获取我的项目列表
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// 添加项目
router.post('/', (req, res) => {
    res.send('Hello World!');
});

// 删除项目
router.delete('/:id', (req, res) => {
    res.send('Hello World!');
});

// 修改项目
router.put('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;