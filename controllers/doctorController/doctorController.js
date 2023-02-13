import mongoose from "mongoose";
import { usersModel } from "../../models/userModel/userModel.js";
import { appointmentModel } from "../../models/userModel/appointmentModel.js";
import { paymentModel } from "../../models/userModel/paymentModel.js";



const dashboard_view=async (req,res)=>{
    let total_pateint=await appointmentModel.find({doctor_id:req.session.user_id}).countDocuments();
    let total_appointment=await appointmentModel.find({doctor_id:req.session.user_id}).countDocuments();
    let total_complete_appointment=await appointmentModel.find({doctor_id:req.session.user_id,status:"complete"}).countDocuments();
    let total_pending_appointment=await appointmentModel.find({doctor_id:req.session.user_id,status:"pending"}).countDocuments();
    let total_cancel_appointment=await appointmentModel.find({doctor_id:req.session.user_id,status:"cancel"}).countDocuments();
    let payments=await paymentModel.find({payment_from:req.session.user_id});      
    let total_payment=0;
    payments.forEach((data,index,array)=>{
         total_payment=total_payment + Number(data.amount);
    });
    console.log(total_payment);
    res.render("doctorView/dashboard.ejs",{
        message:req.flash("message"),
        total_pateint:total_pateint,
        total_appointment:total_appointment,
        total_complete_appointment:total_complete_appointment,
        total_cancel_appointment:total_cancel_appointment,
        total_pending_appointment:total_pending_appointment,
        total_payment:total_payment

    });
}
const appointment_view=async (req,res)=>{
    let new_array=[]
 let  appointment_data=await appointmentModel.find({doctor_id:req.session.user_id}).exec();
 let  patient_data=await usersModel.find({user_type:"Patient"}).exec();
 res.render("doctorView/appointment.ejs",{
    appointment_data:appointment_data,
    patient_data:patient_data,
    record_update_message:req.flash('record_update'),
 });
}
const update_status=async (req,res)=>{
    let id=req.query.id;
   
    console.log(id);
    try{
     let result=await appointmentModel.updateOne({_id:id},{$set:{status:req.query.status}});
     console.log(result);
     req.flash("record_update","record updated sucessfully");
     res.redirect("../doctor/appointmemnt");
    }catch(err){
        console.log(err);
    }


}
const settings_view=async (req,res)=>{
      let get_user=await usersModel.findOne({_id:req.session.user_id,user_type:"Doctor"});
      res.render("doctorView/settings.ejs",{get_user:get_user});
}

const update_setting=async (req,res)=>{
    
    console.log(req.body.image);
    console.log(req.body);
    
    let {first_name,last_name,email,phone,city,state,country,address,dob,councelling_fee,booking_fee,detail_desc,short_desc}=req.body;
    try {

        
         
         let update_record=await usersModel.updateOne({_id:req.session.user_id},{$set:{
            first_name:first_name,
            last_name:last_name,
            
            email:email,
            phone:phone,
            state:state,
            city:city,
            country:country,
            address:address,
            dob:dob,
            councelling_fee:councelling_fee,
            booking_fee:booking_fee,
            councelling_fee:councelling_fee,
            booking_fee:booking_fee,
            detail_desc:detail_desc,
            short_desc:short_desc,
            image:req.file.filename,    
        }}); 
        req.session.new_image=req.file.filename;
        res.redirect("/doctor/settings");
    } catch (error) {
        console.log(error);
    }
}

export {dashboard_view,appointment_view,update_status,settings_view,update_setting}