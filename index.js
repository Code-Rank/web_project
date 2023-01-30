import express from "express";
import userRouter from "./routes/userRoute/userRoutes.js";
import adminRouter from "./routes/adminRoute/adminRoutes.js";
import mongoose  from "mongoose";
import {connection}  from "./database/db.js";



import path from "path";
import ejs from "ejs";

const app =express();
const port=3001;

//database connection
const uri="mongodb://127.0.0.1:27017/MindFree_db";
mongoose.set("strictQuery","false");
connection(uri);







app.set("view engin","ejs");
app.set("views",path.join(process.cwd(),"views"));
app.use(express.static(path.join(process.cwd(),"public")));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});
app.get("/signup",(req,res)=>{
    res.render("signUp.ejs");
});

app.use("/userView",userRouter);
app.use("/adminView",adminRouter);

app.listen(port,(req,res)=>{
    console.log(`${port}`);
    //console.log(path.join(process.cwd(),"/public"));
});
