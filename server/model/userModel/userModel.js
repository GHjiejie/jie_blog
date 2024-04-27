const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: String,
    password: String,
    // 用户的头像
    avatar: {
        type: String,
        default: 'https://www.sucaijishi.com/uploadfile/2016/0203/20160203022635285.png?imageView2/0/q/100|watermark/2/text/57Sg5p2Q6ZuG5biCIC8gU1VDQUlKSVNISS5DT00=/font/5oCd5rqQ6buR5L2T/fontsize/300/fill/I0ZGRkZGRg==/dissolve/30/gravity/Center/dx/0/dy/0',
        required:false
    },
    // 用户的角色
    role: {
        type: String,
        default: '普通用户'
    }
});

const UserModel=mongoose.model('users',UserSchema);
module.exports=UserModel;