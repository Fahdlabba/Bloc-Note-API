const User=require('../../Models/userModules')
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
const sendCode=require('../mailSender/send')
require('dotenv').config
function code(){
    return Math.floor(Math.random() * 1000)
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
    sendCode=code();
    await sendCode(userMail,sendCode)
    res.redirect('/reset')
}
const resetPswd=async (req,res)=>{
    await check('newPswd').isLength({min :8}).run(req);
    await check('code').isLength({min :4}).run(req);
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const{newPswd,code}=req.body;
    const userMail=req.query.mail;
    await User.updateOne(
        {mail:userMail}
    )
    if(code!=sendCode){
        return res.send("Invalid Code !")
    }
    await User.updateOne(
        {mail:userMail},
        {$set:{pswd:newPswd}},
        (err,result)=>{
            if(err){
                console.log(err);
            }
    })
    res.send("Password Updated ! ");
}
module.exports={
    verifyUser,
    resetPswd
}