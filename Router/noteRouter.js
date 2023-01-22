const express=require('express')
const router=express.Router();
const {addNote,fetchNote}=require('../Controller/index')

router.post('/add',addNote)
router.get('/fetch',fetchNote)

module.exports=router