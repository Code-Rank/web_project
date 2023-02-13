import mongoose from "mongoose";

const users=mongoose.Schema({
      first_name:{type:String},
      last_name:{type:String},
      user_type:{type:String},
      email:{type:String},
      phone:{type:String},
      state:{type:String},
      city:{type:String},
      country:{type:String},
      address:{type:String},
      dob:{type:String},
      image:{type:String},
      councelling_fee:{type:String},
      booking_fee:{type:String},
      status:{type:String},
      password:{type:String},

});

const usersModel=mongoose.model("users",users);

export {usersModel}