import express from "express";
const router=express.Router();

router.get("/dashboard",(req,res)=>{
    res.render("adminView/Dashbord.ejs");
});
router.get("/add_doctor",(req,res)=>{
    res.render("adminView/adddoctor.ejs");
});
router.get("/totol_appointment",(req,res)=>{
    res.render("adminView/totalAppointment.ejs");
});
router.get("/user",(req,res)=>{
    res.render("adminView/users.ejs");
});

export default router;