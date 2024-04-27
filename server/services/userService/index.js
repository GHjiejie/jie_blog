const userModel =require('../../model/userModel/userModel');

const userService={

    loginCheck:async (username,password)=>{
    // console.log('检查用户输出的数据',username,password);
        // 根据用户名和密码查询数据库
    const result=await userModel.findOne({username,password});

    return resultCheck(result);
    },

    addUser:async (username,password,role,avatar)=>{
        // 需要注意的是，我们将数据存储到数据库里面是=时，对应的模型需要和下面的参数相同，否则传参会失败
        // console.log('先输出用户提交的文件路径',avatar);
        const result=await userModel.create({username,password,role,avatar});
        // console.log('用户添加成功，我们输出一下result',result);
        return result;
    },
    getUserList:async ()=>{
        const result=await userModel.find();
        return result;
    },
    deleteUser:async (userId)=>{
        const result=await userModel.deleteOne({_id:userId});
        return result;
    },
    updateUser:async (userObj)=>{
        // 根据用户id修改数据库里面的数据
        // 判断是否有新头像
        if(userObj.avatarPath){
            const {userId,username,role,avatarPath:avatar}=userObj;
            const result=await userModel.updateOne({_id:userId},{username,role,avatar});
            return result;
        }else{
            const {userId,username,role}=userObj;
            const result=await userModel.updateOne({_id:userId},{username,role});
            return result;
        }
        
    },

}

const resultCheck=(result)=>{
    if(result){
        return {
            code:200,
            data:result,
            msg:'success'
        }
    }else{
        return {
            code:500,
            data:null,
            msg:'error'
        }
    }
}

module.exports=userService;