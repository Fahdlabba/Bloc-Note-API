const express=require('express')
const {login,createUser,logout,verifyUser,resetPswd}=require('../Controller/index')
const verifyJwt=require('../Middleware/verifUserAuth')
const db=require('../Database/db')
const cookieParser = require('cookie-parser')
const path=require('path')
const note=require('../Router/noteRouter')
const reset=require('../Router/userRouter')
db()

const startApp=(app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static(path.join(__dirname,'../Views')))
    app.use(cookieParser())
    app.post('/register',createUser)
    app.post('/',login)
    app.post('/logout',logout)
    app.use('/forget',reset)
    app.use(verifyJwt)
    app.use('/note',note)

    app.listen(3000,()=>{
        console.log('PORT 3000')
    })

}
module.exports=startApp