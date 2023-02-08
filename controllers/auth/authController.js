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
   usersModel.find({email:email,password:password},"email user_type",(error,result)=>{
    if(result.length>0){
          req.session.email=email;
          req.session.user_type=result[0].user_type;
          /* console.log(result);
          console.log(req.session.email);
          console.log(req.session.user_type); */
          req.flash("message","login successfully");
          res.redirect("../user/user_appointment");
   }else{
            req.flash("message","login attampt faild");
            res.redirect("../login");
   }  
   //res.send(result);
   //res.send(error);  
   //console.log(result);
}) ;

    

}


export {signup,login }