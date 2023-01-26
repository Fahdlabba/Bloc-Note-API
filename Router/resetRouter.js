const express=require('express')
const router=express.Router();
const {verifyUser,resetPswd}=require('../Controller/index')

router.post('/reset',resetPswd)
router.post('/verif',verifyUser)

module.exports=router