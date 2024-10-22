const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")

//routes import
const registerRoute = require('./Routes/userRoutes');
const loginRoute=require("./Routes/loginRoute")
const getAllUsers=require("./Routes/getAllUsers")

//verify token
const verifyToken=require("./Middlewares/auth")

const app=express()
require('dotenv').config()

app.use(cors())
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
app.use("/api/auth/allusers",getAllUsers);

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is running in localhost ${process.env.PORT}`)
})