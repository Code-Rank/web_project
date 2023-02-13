import mongoose from "mongoose";

const appointment=mongoose.Schema({
      pateint_id:{type:String},
      doctor_id:{type:String},
      date:{type:String},
      time:{type:String},
      status:{type:String}

});

const appointmentModel=mongoose.model("appointment",appointment);

export { appointmentModel}