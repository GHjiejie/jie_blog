const JWT =require('../util/JWT');

const authenticateUser=(req,res,next)=>{
  if(req.url.includes('login') || req.url.includes('web')||req.url.includes('public')||req.url.includes('favicon.ico')||req.url.includes('uploads')){
    // console.log('不需要验证token的接口',req.url);
  next();
  return;
}else{
  // console.log('需要验证token的接口',req.url);
  const token = req.headers.authorization.split(' ')[1];
  if(token){ 
      // 检验token是否有效
      let result = JWT.verifyToken(token);
      // console.log('输出result',result);
      if(result){
        // 刷新token的有效期
        const newToken = JWT.generateToken({
          username: result.username,
          userId: result.userId
        });
        res.header('authorization', newToken);
        next();
      }else{
        // 我们在axios拦截器中，如果后端返回的响应状态码为401，则会将浏览器中的token删除，并且跳转到登录页面
        res.status(401).json({
          code: 401,
          msg: '登录已过期，请重新登录'
        });
      }
  }
}   
}

module.exports=authenticateUser;


