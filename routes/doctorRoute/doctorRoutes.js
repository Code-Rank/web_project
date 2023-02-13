import express from "express";
const router =express.Router();
import * as doctorController from "../../controllers/doctorController/doctorController.js";
import multer from "multer";
/* router.use((req,res,next)=>{
    if(req.session.user_type!="Doctor"){
     res.redirect("/login");
    }else{
      next();
    }
  }) */
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    },
    
  })
  var upload = multer({ storage: storage });
router.get('/dashboard',doctorController.dashboard_view);
router.get("/appointmemnt",doctorController.appointment_view);
router.get("/update_status",doctorController.update_status);
router.get("/settings",doctorController.settings_view);
router.post("/update_setting",upload.single("image"),doctorController.update_setting);
/*router.get('/profile', doctorController.profile);
router.get('/patients', doctorController.patients); */

export default router;