import express from "express";
const router =express.Router();
import * as doctorController from "../../controllers/doctorController/doctorController.js";

/* router.use((req,res,next)=>{
    if(req.session.user_type!="Doctor"){
     res.redirect("/login");
    }else{
      next();
    }
  }) */
router.get('/dashboard',doctorController.dashboard_view);
router.get("/appointmemnt",doctorController.appointment_view);
router.get("/update_status",doctorController.update_status);
router.get("/settings",doctorController.settings_view);
/*router.get('/profile', doctorController.profile);
router.get('/patients', doctorController.patients); */

export default router;