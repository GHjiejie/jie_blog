const myLifeServices = require('../../services/myLifeService');

const myLifeController = {
    addMyLife: async (req, res) => {
        const {category,discription}=req.body;
        // 本地环境
         const lifeImgPath=`http://127.0.0.1:9000/uploads/lifeWall/${req.file.filename}`
        // 服务器环境
        // const lifeImgPath=`http://www.ahjie.com/uploads/lifeWall/${req.file.filename}`
        const result = await myLifeServices.addMyLife(category,discription,lifeImgPath);
        return res.json(result);
    },
    getMyLife: async (req, res) => {
        const result = await myLifeServices.getMyLife();
        return res.json(result);
    },
    getMyLifeByCategory: async (req, res) => {
        const { category } = req.params;
        const result = await myLifeServices.getMyLifeByCategory(category);
        return res.json(result);
    },
    deleteMyLifeById: async (req, res) => {
        const { id } = req.params;
        const result = await myLifeServices.deleteMyLife(id);
        return res.json(result);
    },
    updateMyLife: async (req, res) => {
        const { id, discription, lifeImg } = req.body;
        const result = await myLifeServices.updateMyLife(id, discription, lifeImg);
        return res.json(result);
    },
    // 根据id修改生活照片: 
    updateMyLifeById:async(req,res)=>{
        const {id}=req.params;
         const {category,discription}=req.body;
         if(req.file){
                const lifeImgPath=`http://127.0.0.1:9000/uploads/lifeWall/${req.file.filename}`
                const result=await myLifeServices.updateMyLifeById({id,category,discription,lifeImgPath});
                 return res.json(result);
         }else{
                const result=await myLifeServices.updateMyLifeById({id,category ,discription});
                 return res.json(result);
         }
       
       
     }
    
}


module.exports = myLifeController;
