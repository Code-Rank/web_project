import express from "express";
import {
  addDoctor,
  getDoctors,
} from "../../controllers/adminController/adminControllers.js";
import doctorModel from "../../models/doctorModel/doctorModel.js";
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.render("adminView/Dashbord.ejs");
});
router.get("/add_doctor", (req, res) => {
  res.render("adminView/adddoctor.ejs");
});
router.get("/totol_appointment", async (req, res) => {
  const totalDoctors = await doctorModel.find().countDocuments();
  res.render("adminView/totalAppointment.ejs", { totalDoctors: totalDoctors });
});
router.get("/user", async (req, res) => {
  const result = await getDoctors();
  res.render("adminView/users.ejs", { data: result });
});
router.post("/doctor/add-doctor", addDoctor);

export default router;
