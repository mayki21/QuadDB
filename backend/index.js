const express=require("express")
const connection=require("./connection/db")
const User = require('./model/user');
require("dotenv").config()
const mongoose=require("mongoose")
const formdata=require("./route/formdata")
const userroute=require("./route/user")
const authenticate=require("./middleware/auth")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())

app.use("/user",userroute)

app.use(authenticate)

app.use("/formdata",formdata)

app.listen(process.env.port,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error)
    }
    console.log(`connected to ${process.env.port}`)
})



