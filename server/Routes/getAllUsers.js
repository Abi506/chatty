const express=require("express")
const User=require("../Models/userModel")
const verifyToken=require("../Middlewares/auth")
const route=express.Router()

route.get("/:id",verifyToken,async(req,res)=>{
    try{
        const users=await User.find({_id:{$ne:req.params.id}}).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ])
        return res.json(users)
    }
    catch(error){
        res.json({msg:error})
    }
})

module.exports=route