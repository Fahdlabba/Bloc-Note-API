const jwt=require('jsonwebtoken')
require('dotenv').config

const verifyJwt=(req,res,next)=>{
    const token = req.cookies.token
    try{
        const user=jwt.verify(token,process.env.ACCES_TOKEN)
        req.user=user;
        next()
    }catch{
        res.clearCookie('token')
        return res.sendStatus(401);

    }
}
module.exports=verifyJwt