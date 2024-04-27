const ContactModel=require('../../model/contactModel/contactModel');

const contactService={
    addContact:async (name,email,time,feedback)=>{
        const result=await ContactModel.create({name,email,time,feedback});
        return resultCheck(result);
    },
    getContact:async ()=>{
        const result=await ContactModel.find();
        return resultCheck(result);
    },
    deleteContact:async (id)=>{
        const result=await ContactModel.findByIdAndDelete(id);
        return resultCheck(result);
    }
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
module.exports=contactService;  