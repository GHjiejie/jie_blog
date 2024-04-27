const myLifeController=require('../../controller/myLifeController/index');
const express = require('express');
const router = express.Router();
const multer=require('multer');

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads/lifeWall')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()  + file.originalname);
    }
});
const upload=multer({storage:storage});
// 获取所有的生活照片
router.get('/', myLifeController.getMyLife);

// 根据类别获取生活照片
router.get('/category/:category', myLifeController.getMyLifeByCategory);

// 添加生活照片
router.post('/', upload.single('imgFile'), myLifeController.addMyLife);

// 删除生活照片
router.delete('/:id', (req, res) => {
    res.send('Hello World!');
});

// 更新生活照片
router.put('/', (req, res) => {
    res.send('Hello World!');
});
module.exports = router;