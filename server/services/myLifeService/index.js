const mylifeModel=require('../../model/mylifeModel/mylifeModel');

const myLifeServices={
    addMyLife: async (category,discription,lifeImgPath)=>{
        const result=await mylifeModel.create({category,discription,lifeImg:lifeImgPath});
        return result;
    },
    getMyLife: async ()=>{
        const result=await mylifeModel.find();
        return result;
    },
    getMyLifeByCategory: async (category)=>{
        const result=await mylifeModel.find({category});
        return result;
    },
    deleteMyLife: async (id)=>{
        const result=await mylifeModel.findByIdAndDelete(id);
        return result;
    },
    updateMyLife: async (id,discription,lifeImg)=>{
        const result=await mylifeModel.findByIdAndUpdate(id,{discription,lifeImg});
        return result;
    },
    updateMyLifeById:async(data)=>{
        if(data.lifeImgPath){
            const result=await mylifeModel.findByIdAndUpdate(data.id,{category:data.category,discription:data.discription,lifeImg:data.lifeImgPath});
             return result;
        }else{
            const result=await mylifeModel.findByIdAndUpdate    (data.id,{category:data.category,discription:data.discription});   
             return result;
        }
       
    }
}

module.exports=myLifeServices;
