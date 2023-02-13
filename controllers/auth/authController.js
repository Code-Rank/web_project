import mongoose from "mongoose";

import {usersModel} from "../../models/userModel/userModel.js"

 const signup=async (req,res)=>{


    let {user_type,first_name,last_name,email,password}=req.body;
    
    let user=new usersModel({
        first_name:first_name,
        last_name:last_name,
        user_type:user_type,
        password:password,
        email:email,
    });

    let result =await user.save();

        if(result){ 
         
            req.flash("message","signup successfully");
            //console.log(req.baseUrl);
            res.redirect("../login");
           //res.render("signUp.ejs",{msg:msg});
        }else{
            req.flash("message","operation failed sign up again");
            res.redirect("../signup");
        }

     


}

const login= async(req,res)=>
{
  let {email,password}=req.body;
  //res.send(req.body);
   usersModel.find({email:email,password:password},(error,result)=>{
    if(result.length>0){
          console.log(result[0]);
          req.session.email=email;
          req.session.user_type=result[0].user_type;
          req.session.user_id=result[0]._id;
          req.session.old_image=result[0].image;
          req.session.first_name=result[0].first_name;
          req.session.last_name=result[0].last_name;
          //console.log(req.session.image);
          /* console.log(result);
          console.log(req.session.email);
          console.log(req.session.user_type); */
          if(req.session.user_type=="admin"){
            req.flash("message","login successfully");
            res.redirect("../admin/totol_appointment"); 
          }else if(req.session.user_type=="Patient"){
            req.flash("message","login successfully");
            res.redirect("../user/user_appointment");
          }else if(req.session.user_type=="Doctor"){
            req.flash("message","login successfully");
            res.redirect("../doctor/dashboard");
          }
          /* req.flash("message","login successfully");
          res.redirect("../user/user_appointment"); */
   }else{
            req.flash("message","login attampt faild");
            res.redirect("../login");
   }  
   //res.send(result);
   //res.send(error);  
   //console.log(result);
}) ;

    

}
const logout=(req,res)=>{
    req.session.destroy((err) => {
        res.redirect('/login') // will always fire after session is destroyed
    });
}

export {signup,login ,logout}