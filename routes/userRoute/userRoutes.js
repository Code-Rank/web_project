import express from "express";
import * as users from "../../controllers/userController/userControllers.js";
const router=express.Router();

router.get("/user_appointment",(req,res)=>{
    res.render('userView/user_appointment.ejs');
    //res.send("hello");
});
router.get("/doctors",(req,res)=>{
    res.render('userView/doctors.ejs');
    //res.send("hello");
});
router.get("/create_appointment",(req,res)=>{
    res.render('userView/create_appointment.ejs');
    //res.send("hello");
});
router.get("/payment",(req,res)=>{
    res.render('userView/payment.ejs');
    //res.send("hello");
});


router.get("/create",users.createUser);
router.get("/find/:name/:password",users.findUser);

export default router;

