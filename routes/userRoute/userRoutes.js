import express from "express";

const router=express.Router();

router.get("/user_appointment",(req,res)=>{
    res.render('userView/user_appointment.ejs');
    //res.send("hello");
});

export default router;

