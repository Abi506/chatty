const express=require("express");
const messageModel = require("../Models/messageModel");
const route=express.Router()

route.post('/addmsg/',async(req,res)=>{
    try{
        const {from,to,message}=req.body;
        const data=await messageModel.create({
            message:{text:message},
            users:[from,to],
            sender:from
        })
        if(data) return res.json({msg:"Message Added Successfully"})
        return res.json({msg:"Failed to add Message to the database"})
    }
    catch(error){
        res.json({msg:error.message})
    }
})

route.post('/getmsg/',async(req,res)=>{
    try{
        const{from,to}=req.body;
        const messages=await messageModel
        .find({
            users:{
                $all:[from,to]
            }
        })
        .sort({updatedAt:1})
        const projectMessages=messages.map((msg)=>{
            return{
                fromSelf:msg.sender.toString()===from,
                message:msg.message.text,
            }
        })
        res.json(projectMessages)
    }
    catch(error){
        res.json({msg:error.message})
    }
})
module.exports=route