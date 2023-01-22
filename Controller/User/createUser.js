const User=require('../../Models/userModules')
const {check,validationResult}=require('express-validator')

const createUser=async(req,res)=>{
    await check('username').isLength({min:6}).isString().run(req);
    await check('userMail').isEmail().run(req);
    await check('userPswd').isLength({min :8}).run(req);
    const result=validationResult(req)
    if(!result.isEmpty){
        return res.send('Verifier Votre Input ');
    }
    const {userMail,username,userPswd}=req.body;
    const verifyUser=await User.find({mail:userMail})
    if(verifyUser.length!=0){
        return res.send('User Exist ')
    }
    new User({
        mail:userMail,
        name:username,
        pswd:userPswd,
    }).save();

    res.send("User ADD ")
}
module.exports=createUser