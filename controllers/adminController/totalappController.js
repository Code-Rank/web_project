import doctorModel from "../../models/adminModel/Doctor.js"

const totalappController = async (req, res) => {
  const totalDoctors = await doctorModel.find({}).countDocuments()
  res.render("adminView/totalAppointment.ejs", {
    title: "Total Appointment and Payment",
    totalDoctors,
  })
}

export { totalappController }
