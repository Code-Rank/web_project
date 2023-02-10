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

export default doctorModel;
