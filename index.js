import express from "express";
import authRouters from "./routes/authRouter/authRoutes.js";
import mongoose  from "mongoose";
import {connection}  from "./database/db.js";
import flash from "connect-flash";
import session from "express-session";



import path from "path";
import ejs from "ejs";

const app =express();
const port=3001;

//database connection
const uri="mongodb://127.0.0.1:27017/MindFree_db";
mongoose.set("strictQuery","false");
connection(uri);

app.use(session({
    secret:"12345",
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());





app.set("view engin","ejs");
app.set("views",path.join(process.cwd(),"views"));
app.use(express.static(path.join(process.cwd(),"public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.get("/login",(req,res)=>{
    res.render("login.ejs",{message:req.flash("message")});
});
app.get("/signup",(req,res)=>{
    res.render("signUp.ejs",{message:req.flash("message")});
});
app.use("/auth",authRouters);



app.listen(port,(req,res)=>{
    console.log(`${port}`);
    console.log(path.join(process.cwd(),"/public"));
});
