import express from "express";
const router=express.Router();

router.get("/dashboard",(req,res)=>{
    res.render("adminView/Dashbord.ejs");
});

export default router;