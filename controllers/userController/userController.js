import mongoose  from "mongoose";
import { usersModel } from "../../models/userModel/userModel.js";
const Publishable_Key = 'pk_test_51MZe2fBU7BNQr99bH0a5mpG737QKNxRoGaGsjxK4SxapQ4kzXm2pNJwCgY4NsoOzllro1DycJYHKOof7cnYvWWa1001E6F6KOJ';
const Secret_Key = 'sk_test_51MZe2fBU7BNQr99bLMqORqAPAAHhAavCa2shuDbxKFRP8uFxr506MxHfTh9ywd0SH3EOksAibixrm8ivbqkwa72l00pwaOysFa';
import Stripe from "stripe";

const stripe = new Stripe(Secret_Key);


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
      console.log(req.session.user_id);
      usersModel.find({_id:req.session.user_id},"first_name last_name email",(error,result)=>{
        if(result){
            console.log(result);
            res.render("userView/payment.ejs",{
                appointment_date:appointment_date,
                appointment_time:appointment_time,
                doctor_id:doctor_id,
                key:Publishable_Key,
                result:result
              });
        }

    })
     

}

const payment_process=(req,res)=>{
console.log(req.body);
stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
    name: 'Gautam Sharma',
    address: {
    line1: 'TC 9/4 Old MES colony',
    postal_code: '110092',
    city: 'New Delhi',
    state: 'Delhi',
    country: 'India',
    }
    })
    .then((customer) => {
     
    return stripe.charges.create({
    amount: 7000, // Charing Rs 25
    description: 'Web Development Product',
    currency: 'USD',
    customer: customer.id
    });
    })
    .then((charge) => {
    req.flash("message","Payment done successfully");
    
    res.redirect("../user/create_appointment"); // If no error occurs
    })
    .catch((err) => {
    res.send(err) // If some error occurs
    });

}


export {
doctorView,
doctor_profile,
create_appointment_view,
payment_view,
payment_process}