const express=require('express')
const {login,createUser,logout}=require('../Controller/index')
const verifyJwt=require('../Middleware/verifUserAuth')
const db=require('../Database/db')
const cookieParser = require('cookie-parser')
const path=require('path')
const note=require('../Router/noteRouter')
db()

const startApp=(app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static(path.join(__dirname,'../Views')))
    app.use(cookieParser())
    app.post('/register',createUser)
    app.post('/',login)
    app.post('/logout',logout)
    app.use(verifyJwt)
    app.use('/note',note)

    app.listen(3000,()=>{
        console.log('PORT 3000')
    })

}
module.exports=startApp