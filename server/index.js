const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const path=require('path')
const socket=require("socket.io")

//routes import
const registerRoute = require('./Routes/userRoutes');
const loginRoute=require("./Routes/loginRoute")
const currentUser=require("./Routes/currentUser")
const allUsers=require("./Routes/allUsers")
const messageRoute=require("./Routes/messageRoute")

const app=express()
require('dotenv').config()

app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json())

//mongoose connection
mongoose.connect(process.env.mongo_url)
.then(()=>console.log("MongoDB connected Successfully"))
.catch((error)=>console.log("Error while connecting mongodb",error))

//server static files
app.use("/images",express.static("images"))

//routes
app.use("/api/auth/register",registerRoute)
app.use('/api/auth/login',loginRoute)
app.use("/api/auth/currentUser",currentUser);
app.use('/api/auth/allUsers',allUsers)
app.use('/api/messages',messageRoute)

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running in localhost ${process.env.PORT}`)
})

const io=socket(server,{
    cors:{
        origin:"http://localhost:5173",
        credentials:true
    }
})

global.onlineUsers=new Map()

io.on('connection',(socket)=>{
    global.chatSocket=socket 

    socket.on("add-user",(userId)=>{
        onlineUsers.set(userId,socket.id)
    })

    socket.on('send-msg',(data)=>{
        const sendUserSocket=onlineUsers.get(data.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('msg-recieve',data.message);
        }
    })
})

