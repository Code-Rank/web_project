import doctor from "../../models/adminModel/Doctor.js"

const userController = async (req, res) => {
  try {
    const result = await doctor.find({})
    res.render("adminView/users.ejs", { data: result })
  } catch (error) {
    console.log(error)
  }
}

export { userController }
