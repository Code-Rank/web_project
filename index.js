import express from "express";
import path from "path";
import ejs from "ejs";
const app =express();
const port=3001;

app.set("view engin","ejs");
app.set("views","./views");
app.use(express.static(path.join(process.cwd(),"public")));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.listen(port,(req,res)=>{
    console.log(`${port}`);
    console.log(path.join(process.cwd(),"/public"));
});
