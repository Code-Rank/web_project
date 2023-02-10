import mongoose from "mongoose";

//defining schema
const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, trim: true, required: true },
  password: { type: String, required: true },
  confirmpassword: { type: String, required: true },
  address: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  hospital: { type: String, required: true },
  specialist: { type: String, required: true },
});

//compiling schema

const doctorModel = mongoose.model("doctor", doctorSchema);

//creating document

// const createDoc = async () => {
//   try {
//     const doctorDoc = new doctorModel({
//       name: "Huzaifa Sherz",
//       email: "romashsddj23gmail",
//       password: "dfhjskfh",
//       confirmpassword: "roman34923",
//       address: "johar town",
//       phonenumber: 32473294,
//       hospital: "doctor hospital",
//       specialist: "psychologist",
//     });
//     const result = await doctorDoc.save();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

//retrive document
// const getAllDoc = async () => {
//   const result = await doctorModel.find();
//   console.log(result);
// };

//retirve specific field

// const getAllName = async () => {
//   const result = await doctorModel.find().select("name age");
//   console.log(result);
// };

//countDOc
// const countDoc = async () => {
//   const result = await doctorModel.find().countDocuments();
//   console.log(result);
// };

// const DeletebyId = async (id) => {
//   try {
//     const result = await doctorModel.findByIdAndDelete(id);
//     console.log(result);
//   } catch (err) {
//     console.log(error);
//   }
// };

export default doctorModel;
