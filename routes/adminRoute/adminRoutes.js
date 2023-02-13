import express from "express";
import * as adminController from "../../controllers/adminController/adminControllers.js";
import {appointmentModel} from "../../models/userModel/appointmentModel.js"

const router = express.Router();
router.use((req,res,next)=>{
  if(req.session.user_type!="admin"){
   res.redirect("/login");
  }else{
    next();
  }
})
router.get("/dashboard", (req, res) => {
  res.render("adminView/Dashbord.ejs");
});
router.get("/add_doctor", (req, res) => {
  res.render("adminView/adddoctor.ejs");
});
router.get("/totol_appointment", adminController.home);

router.post("/doctor/add-doctor", adminController.addDoctor);


router.get("/user",adminController.getDoctors);
router.get('/app_reject',adminController.status_update);
router.get('/app_accept',adminController.status_update);
/* router.get('/app_view',status_update); */
export default router;
