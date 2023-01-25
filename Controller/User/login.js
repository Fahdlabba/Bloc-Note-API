const User=require('../../Models/userModules')
const {check,validationResult}=require('express-validator')
const jwt=require('jsonwebtoken')
require('dotenv').config

const login=async(req,res)=>{
    await check('userMail').isEmail().run(req);
    await check('userPswd').isLength({min :8}).run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const {userMail,userPswd}=req.body;
    const user=await User.find({mail:userMail ,pswd:userPswd});
    if(user.length===0){
        return res.redirect('/')
    }
    const token=jwt.sign({user},process.env.ACCES_TOKEN,{expiresIn:'1h'});
    res.cookie("token",token,{
        httpOnly:true
    })
    res.send("hello")
}
module.exports=login