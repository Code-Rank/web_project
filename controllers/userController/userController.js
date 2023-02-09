import mongoose  from "mongoose";
import { usersModel } from "../../models/userModel/userModel.js";

const doctorView=(req,res)=>{


    usersModel.find({user_type:"Doctor"},"first_name last_name email",(error,result)=>{

        if(result){
            console.log(result);
            res.render('userView/doctors.ejs',{result:result});
        }
    });

    //res.render('userView/doctors.ejs');
}
const doctor_profile=(req,res)=>{
    let id=req.query.id;
    console.log(req.query.id);
     usersModel.find({_id:id},"first_name last_name email",(error,result)=>{

        if(result){
            console.log(result);
            res.render('userView/doctor_profile.ejs',{result:result});
        }
    }); 
}
const create_appointment_view=(req,res)=>{
    let id =req.query.id;
    usersModel.find({_id:id},"first_name last_name email",(error,result)=>{
        if(result){
            console.log(result);
            res.render('userView/create_appointment.ejs',{result:result});
        }

    })
}
const payment_view=(req,res)=>{
     
      let {appointment_date,appointment_time,doctor_id}=req.query;
      console.log(appointment_date);
      res.render("userView/payment.ejs",{
        appointment_date:appointment_date,
        appointment_time:appointment_time,
        doctor_id:doctor_id
      });

}

const payment_process=(req,res)=>{
console.log(req.body);
}


export {
doctorView,
doctor_profile,
create_appointment_view,
payment_view,
payment_process}