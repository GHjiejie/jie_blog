const userService=require('../../services/userService/index');
// const path=require('path');
// 直接导入JWT模块
const JWT=require('../../util/JWT');

// 设置静态文件目录
// const avatarDir = path.join(__dirname, '../../public/uploads/avatar');


const userController={
    loginCheck:async (req,res)=>{
       const {username,password}=req.body;
        //  console.log('输出用户提交的数据',username,password);
       const result=await userService.loginCheck(username,password);
       if(result.code===200){ 
       const token=JWT.generateToken({
        username:result.data.username,
        userId:result.data._id,
       });
    //    用户的身份验证成功后，将身份信息存储到返回的响应头中，以便前端获取
       res.header('authorization',token);
        return res.json(result);
        //    req.session.userInfo=result.data;
       }else{
              return res.json(result);
       }
    //    return res.json(result);
    },
    addUser: async(req,res)=>{
        console.log(req.file);
        // 本地环境
        const avatarPath=`http://127.0.0.1:9000/uploads/avatar/${req.file.filename}`
        // 服务器环境
        // const avatarPath=`http://www.ahjie.com/uploads/avatar/${req.file.filename}`
        // const filePath = path.join(avatarDir, req.file.path);
        const {username,password,role}=req.body;
        const result=await userService.addUser(username,password,role,avatarPath);
        return res.json(result);
    },
    getUserList:async (req,res)=>{
        const result=await userService.getUserList();
     return res.json(result);   
    },
    deleteUser:async (req,res)=>{
        const {userId}=req.params;
        // console.log('输出用户提交的数据',req.params.userId);
        const result=await userService.deleteUser(userId);
     return res.json(result);   
    },
    updateUser:async (req,res)=>{
        const {userId,username,role}  =req.body;
        //   const avatarPath=req.file ?`/uploads/avatar/${req.file.filename}`:'';
        if(req.file){
            const avatarPath=`http://127.0.0.1:9000/uploads/avatar/${req.file.filename}`;
            const updateData={userId,username,role,avatarPath}
            const result=await userService.updateUser(updateData);
            return res.json(result);
        }else{
             const updateData={userId,username,role}
            const result=await userService.updateUser(updateData);
             return res.json(result);
        }
       
    }
}

module.exports=userController;