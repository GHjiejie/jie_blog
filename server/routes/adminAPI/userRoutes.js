
const userController = require('../../controller/userController/index');
const path=require('path');
var express = require('express');
var router = express.Router();
const multer  = require('multer')
// const upload = multer({ dest: './public/uploads/avatar' });
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/avatar')
    },
    filename: function (req, file, cb) {
        // 要有文件后缀
      cb(null,Date.now()  + file.originalname);
    }
  });
  const upload = multer({ storage: storage });

// 登录验证
router.post('/loginCheck',userController.loginCheck);
// 添加用户
router.post('/', upload.single('avatar'), userController.addUser);
// router.post('/profile',upload.single('avatar'),(req,res,next)=>{
//     console.log(req.file);
//     console.log(req.body);
//     res.send(req.file);
// });
// 获取用户列表
router.get('/',userController.getUserList);
// 删除用户
router.delete('/:userId',userController.deleteUser);
// 修改用户
router.put('/',upload.single('newAvatar'), userController.updateUser);

module.exports = router;
