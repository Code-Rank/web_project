import doctorModel from "../../models/adminModel/Doctor.js"
// import flash from "connect-flash"

const createDoctor = async (req, res) => {
  // const message = req.flash("message") ? req.flash("message") : ""
  const message = "-"
  res.render("adminView/addDoctor.ejs", {
    title: "Add Doctor",
    message: message,
  })
}

/**
 * @desc This funciton used to create Doctor
 * @path /api/add_doctor POST
 * @access private
 */

const addDoctor = async (req, res) => {
  console.log("Req => ", req.body)
  const { body } = req

  // Validation
  if (!req.body.name) {
    throw new Error("Name is required")
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
  })

  // Redirectr
  req.flash("message", "Doctor has been successfully created")
  res.redirect("/admin/doctor/add-doctor")
}

export { createDoctor, addDoctor }
