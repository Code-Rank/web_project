import doctorModel from "../../models/doctorModel/doctorModel.js";
import doctor from "../../models/doctorModel/doctorModel.js";
import { usersModel } from "../../models/userModel/userModel.js";
import {appointmentModel} from "../../models/userModel/appointmentModel.js"
import {paymentModel} from "../../models/userModel/paymentModel.js";
import flash from "connect-flash";

const createDoctor = async (req, res) => {
  const message = req.flash("message");
  res.render("adddoctor", { title: "Add Doctor", message: message });
};
/**
 * @desc This funciton used to create Doctor
 * @path /api/add_doctor POST
 * @access private
 */

const addDoctor = async (req, res) => {
  console.log("Body => ", req.body);
  const { body } = req;
  // Validation
  if (!req.body.name) {
    throw new Error("Name is required");
  }

  // Add the doctor
  await doctorModel.create({
    name: body.name,
    email: body.email,
    password: body.password,
    confirmpassword: body.password,
    address: body.address,
    phonenumber: body.phonenumber,
    hospital: body.hospital,
    specialist: body.specialist,
  });

  // Redirectr
  res.redirect("/admin/add_doctor");
};

/**
 * @desc This function used to get doctors
 * @path admin/user (GET)
 * @access public
 */
const getDoctors = async (req, res) => {
  try{
   let result= await usersModel.find({});
  
     console.log(result);
     res.render("adminView/users.ejs", { result: result,status:req.flash("message") });
 
  }catch(err){
console.log(err);
  }
};

const status_update = async (req, res) => {
  try{
     let result =await usersModel.updateOne({_id:req.query.id},{$set:{status:req.query.status}});
     console.log(result);
     req.flash("status","status update successfully");
     res.redirect("../admin/user");
 
  }catch(err){
console.log(err);
  }
};

const home=async (req,res)=>{
  try{
  let total_doctor=await usersModel.find({user_type:"Doctor"}).countDocuments();
  let total_patient=await usersModel.find({user_type:"Patient"}).countDocuments();
  let total_appointment=await appointmentModel.find().countDocuments();
  let total_payment=await appointmentModel.find().countDocuments();
  res.render("adminView/totalAppointment.ejs",{
    total_doctor:total_doctor,
    total_patient:total_patient,
    total_appointment:total_appointment,
    total_payment:total_payment

  })
  }catch(err){
    console.log(err);
  }
}
export { createDoctor, addDoctor, getDoctors,status_update ,home};
