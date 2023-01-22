const User=require('../../Models/userModules')
const {check,validationResult}=require('express-validator')

const addNote=async(req,res)=>{
    await check('note').isLength({min:10}).isString().run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const {note}=req.body;
    const userMail=req.query.mail 
    User.updateOne(
        {mail:userMail},
        {$push:{ notes:[{note}] }},
        (err,result)=>{
            if(err) console.log(err)
        })
    res.send("Note ADD ")
}
module.exports=addNote