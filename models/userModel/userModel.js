import mongoose from "mongoose";

const users=mongoose.Schema({
      first_name:{type:String},
      last_name:{type:String},
      user_type:{type:String},
      email:{type:String},
      password:{type:String},

});

const usersModel=mongoose.model("users",users);

export {usersModel}