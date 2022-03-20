const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const path=require("path")
const cookieparser=require("cookie-parser")
const app=express();
app.use(express.json());
app.use(cors())
app.use(cookieparser());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

const adminRouter=require("./src/router/adminRouter")
app.use("/api/admin",adminRouter)
const studentRouter=require("./src/router/studentRouter")
app.use("/api/student",studentRouter)
const teacherRouter=require("./src/router/teacherRouter");
app.use("/api/teacher",teacherRouter)
const homeRouter=require("./src/router/homeRouter");
const { application } = require("express");
app.use("/api",homeRouter)

app.use(express.static(path.join(__dirname,'./build')))
app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,'./build'))
})

mongoose.connect("mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/schoolManagamentSystem?retryWrites=true&w=majority",()=>{
    console.log("Database Connected")
})
app.listen( process.env.PORT||1234,()=>{
    console.log("server is listening...http://localhost:1234");
})