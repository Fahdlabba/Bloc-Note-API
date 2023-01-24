const express=require('express')
const router=express.Router();
const {login,createUser}=require('../Controller/index')

router.route('/').post(login).get(createUser)

module.exports=router