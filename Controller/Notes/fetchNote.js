const {check,validationResult}=require('express-validator');
const User = require('../../Models/userModules');

const fetchNote=async(req,res)=>{
    await check('userMail').isEmail().run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        res.send('Verifier Votre Input !');
    }
    const userMail=req.query.mail;
    const notes=await User.findOne({mail:userMail})
    res.json(notes.notes);
}
module.exports=fetchNote