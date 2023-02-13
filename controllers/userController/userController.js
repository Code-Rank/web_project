import mongoose  from "mongoose";
import { usersModel } from "../../models/userModel/userModel.js";
import { appointmentModel } from "../../models/userModel/appointmentModel.js";
import { paymentModel } from "../../models/userModel/paymentModel.js";
const Publishable_Key = 'pk_test_51MZe2fBU7BNQr99bH0a5mpG737QKNxRoGaGsjxK4SxapQ4kzXm2pNJwCgY4NsoOzllro1DycJYHKOof7cnYvWWa1001E6F6KOJ';
const Secret_Key = 'sk_test_51MZe2fBU7BNQr99bLMqORqAPAAHhAavCa2shuDbxKFRP8uFxr506MxHfTh9ywd0SH3EOksAibixrm8ivbqkwa72l00pwaOysFa';
import Stripe from "stripe";
import fs from "fs";

const stripe = new Stripe(Secret_Key);


 function find_user(id){
      usersModel.find({_id:id}).exec((err,result)=>{
        if(result){
            //arra_obj[index].push();
            //console.log(result);
        return result;
        }else{
            console.log(err)
        }
    });
    

}

const user_appointment_view=async (req,res)=>{
 let new_array=[]
 let  appointment_data=await appointmentModel.find({pateint_id:req.session.user_id}).exec();
 let  doctor_data=await usersModel.find({user_type:"Doctor"}).exec();
 res.render("userView/user_appointment.ejs",{
    appointment_data:appointment_data,
    doctor_data:doctor_data,
    record_update_message:req.flash('record_update'),
 });
}




const doctorView=  (req,res)=>{

try{
    usersModel.find({user_type:"Doctor"},"first_name last_name email",(error,result)=>{

        if(result){
            console.log(result);
            res.render('userView/doctors.ejs',{result:result});
        }
    });

}catch(error){
console.log(error);
}

    //res.render('userView/doctors.ejs');
}
const doctor_profile= (req,res)=>{

    let id=req.query.id;
    console.log(req.query.id);
      usersModel.find({_id:id},(error,result)=>{

        if(result){
            console.log(result);
            res.render('userView/doctor_profile.ejs',{
            result:result,
            payment_message:req.flash("payment_message"),
            payment_error_message:req.flash("payment_error_message"),
     
        });
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
const payment_view=async (req,res)=>{
     
      let {appointment_date,appointment_time,doctor_id}=req.query;
      console.log(appointment_date);
      console.log(req.session.user_id);
     if(req.session.user_id){
    let doctor_data=await usersModel.find({_id:doctor_id});
      usersModel.find({_id:req.session.user_id},(error,result)=>{
        if(result){
            console.log(result);
            res.render("userView/payment.ejs",{
                appointment_date:appointment_date,
                appointment_time:appointment_time,
                doctor_id:doctor_id,
                key:Publishable_Key,
                result:result,
                doctor_data:doctor_data,
                total:result[0].booking_fee+result[0].councelling_fee,
              });
        }

    })
     
     }else{
        res.redirect("../login");
     }
}

const payment_process=(req,res)=>{
const {appointment_date,appointment_time,doctor_id,first_name,last_name,email,phone,amount,total_amount}=req.body;
    stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: `${first_name} ${last_name}`,
    address: {
    line1: 'TC 9/4 Old MES colony',
    postal_code: '110092',
    city: 'Lahore',
    state: 'Punjab',
    country: 'Pakistan',
    }
    })
    .then((customer) => {
     
    return stripe.charges.create({
    amount: total_amount, // Charing Rs 25
    description: 'Web Development Product',
    currency: 'USD',
    customer: customer.id
    });

    })
    .then((charge) => {
    const appointment=new appointmentModel({
        pateint_id:req.session.user_id,
        doctor_id:doctor_id,
        date:appointment_date,
        time:appointment_time,
        status:"pending"
    });
    const appointment_result = appointment.save();
    const payment=new paymentModel({
        payment_to:req.session.user_id,
        payment_from:doctor_id,
        amount:total_amount,
        timeStamp:Date.now(),
       
    });
    const payment_result = payment.save();

    req.flash("payment_message","Payment done successfully");
    
    res.redirect(`../user/doctor_profile?id=${doctor_id}`); // If no error occurs
    })
    .catch((err) => {
    res.send(err) // If some error occurs
    req.flash("payment_error_message","Payment operation failed");
    
    res.redirect(`../user/doctor_profile?id=${doctor_id}`); // If no error occurs
    });

}

const update_status=async (req,res)=>{
    let id=req.query.id;
    let id_trim=id.trim();
    console.log(id);
    try{
     let result=await appointmentModel.updateOne({_id:id_trim},{$set:{status:"cancel"}});
     console.log(result);
     req.flash("record_update","record updated sucessfully");
     res.redirect("../user/user_appointment");
    }catch(err){
        console.log(err);
    }


}
const show_setting=async (req,res)=>{
    try{
    let get_user=await usersModel.findOne({_id:req.session.user_id});
    console.log(get_user);
    res.render("userView/settings.ejs",{get_user:get_user});
    }catch(err){
        console.log(err);
    }

}
const update_setting=async (req,res)=>{
    
    console.log(req.body.image);
    let {first_name,last_name,email,phone,city,state,country,address,dob,councelling_fee,booking_fee}=req.body;
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
            image:req.file.filename,    
        }}); 
        req.session.new_image=req.file.filename;
        res.redirect("/user/user_appointment");
    } catch (error) {
        console.log(error);
    }
}

export {
doctorView,
doctor_profile,
create_appointment_view,
payment_view,
payment_process,
user_appointment_view,
update_status,
show_setting,
update_setting}