const express=require("express")
const userroute=express.Router()
const userModel=require("../model/user")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
require("dotenv").config()


userroute.post("/register",async(req,res)=>{
    try {
      const {user_name,user_email,user_password}=req.body
      bcrypt.hash(user_password,4, async(err, hash)=> {
        const user=new userModel({user_name,user_email,user_password:hash})
        await user.save()
        res.status(200).send({"msg":"user registered successfully"})
    })
        
    }
     catch (error) {
        res.status(400).send({"msg":"error"})
    }

})




userroute.post("/login",async(req,res)=>{
    try {
        const {user_email,user_password}=req.body
        const getdata=await userModel.findOne({user_email})
        if(getdata)
        {
            bcrypt.compare(user_password, getdata.user_password, async(err, result)=> {
                if(result)
                {
                   res.status(200).send({"msg":"successful login","token":jwt.sign({"userID":getdata._id},process.env.secret,{expiresIn:"12h"})})
                }
                else
                {
                    res.status(404).send({"msg":"wrong credential"})
                }
               
            });
        }
    } 
    catch (error) {
        res.status(404).send({"msg":"not valid user"})
    }
})


module.exports=userroute