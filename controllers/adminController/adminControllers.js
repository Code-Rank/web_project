import doctorModel from "../../models/doctorModel/doctorModel.js";
import doctor from "../../models/doctorModel/doctorModel.js";
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
  return await doctor.find({});
};

export { createDoctor, addDoctor, getDoctors };
