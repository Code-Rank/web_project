import express from "express";
import * as users from "../../controllers/userController/userController.js";
import multer from "multer";

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    },
    
  })
  var upload = multer({ storage: storage });
  const router=express.Router();



router.get("/user_appointment",users.user_appointment_view);
router.get("/doctors",users.doctorView);
router.get("/doctor_profile", users.doctor_profile);
router.get("/create_appointment",users.create_appointment_view);
router.get("/payment",users.payment_view);
router.post("/payment_process",users.payment_process);
router.get("/update_status",users.update_status);
router.get("/settings",users.show_setting);
router.post("/update_setting",upload.single("image"),users.update_setting);






export default router;

