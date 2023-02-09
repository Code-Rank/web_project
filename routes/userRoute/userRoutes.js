import express from "express";
import * as users from "../../controllers/userController/userController.js";
const router=express.Router();

router.get("/user_appointment",(req,res)=>{
    res.render('userView/user_appointment.ejs');
    //res.send("hello");
});
router.get("/doctors",users.doctorView);
router.get("/doctor_profile",users.doctor_profile);
router.get("/create_appointment",users.create_appointment_view);
router.get("/payment",users.payment_view);
router.post("/payment_process",users.payment_process);




export default router;

