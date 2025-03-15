const express =require('express')
const mongoose=require('mongoose')
const path =require('path')
const port=3019

const app=express();

app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/tracker')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection succesful")
})

const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String
})

const Users=mongoose.model("data",userSchema)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/post',async(req,res)=>{
    const {name,email,phone}=req.body
    const user=new Users({
        name,
        email,
        phone
    })
    await user.save()
    console.log(user)
    res.sendFile(path.join(__dirname,'success.html'))
})

app.listen(port,()=>{
    console.log(("Server started"))
})