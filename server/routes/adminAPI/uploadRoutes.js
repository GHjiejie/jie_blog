const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// 上传图片的存储位置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/uploads/lifeWall'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
// 上传图片的配置
const upload = multer({
    storage: storage
});
// 上传图片
router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file);
    res.send(req.file);
});
// 删除图片
router.delete('/:id', (req, res) => {
    const filePath = path.join(__dirname, '../../public/upload/' + req.params.id);
    fs.unlink(filePath, (err) => {
        if (err) {
            res.send({
                code: 500,
                msg: '删除失败'
            });
        }
        else {
            res.send({
                code: 200,
                msg: '删除成功'
            });
        }
    });
});

module.exports = router;