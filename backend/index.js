const express=require("express")
const connection=require("./connection/db")
require("dotenv").config()
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())


app.listen(process.env.port,async()=>{
    try {
        await connection
    } catch (error) {
        console.log(error)
    }
    console.log(`connected to ${process.env.port}`)
})



