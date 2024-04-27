const contactServices=require('../../services/contactService/index');

const contactMeController={
    addContact:async (req,res)=>{
        const {name,email,time,feedback}=req.body;
        const result=await contactServices.addContact(name,email,time,feedback);
        return res.json(result);
    },
    getContact:async (req,res)=>{
        const result=await contactServices.getContact();
        return res.json(result);
    },
    deleteContact:async (req,res)=>{
        const {id}=req.params;
        const result=await contactServices.deleteContact(id);
        return res.json(result);
    }
}
module.exports=contactMeController;