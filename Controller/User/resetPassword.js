const User=require('../../Models/userModules')
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const sendCode=require('../mailSender/send')
require('dotenv').config
function code(){
    return Math.floor(Math.random() * 10000)
}
let sendedCode=0;

const verifyUser=async(req,res)=>{
    await check('userMail').isEmail().run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const {userMail}=req.body;
    const user=await User.find({mail:userMail});
    if(user.length===0){
        return res.send("User Not Found !");
    }
    sendedCode=code();
    await sendCode(userMail,sendedCode)
    res.redirect('Code Send')
}
const resetPswd=async (req,res)=>{
    await check('newPswd').isLength({min :8}).run(req);
    await check('code').isLength({min :4}).run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const{newPswd,code}=req.body;
    const userMail=req.query.mail;
    await User.updateOne(
        {mail:userMail}
    )
    if(code!=sendedCode){
        return res.send("Invalid Code !")
    }
    await User.updateOne(
        {mail:userMail},
        {$set:{pswd:newPswd}}
    )
    res.redirect('/');
}
module.exports={
    verifyUser,
    resetPswd
}