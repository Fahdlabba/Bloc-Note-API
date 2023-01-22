const mongoose=require("mongoose")
const Schema=mongoose.Schema

const note=new Schema({
    note:{
        type :String,
        require:true
    }
})
const userSchema=new Schema({
    mail:{
        type:String,
        require :true,
    },
    name :{
        type : String,
        require:true, 
    },
    pswd:{
        type :String ,
        require:true
    },
    token:{
        type:String,
    },
    notes:[note]
})

const User=mongoose.model('User',userSchema)
module.exports=User