import mongoose from "mongoose";

import {usersModel} from "../../models/userModel/userModel.js"

 const createUser=async (req,res)=>{


    let user=new usersModel({
        first_name:"Umair",
        last_name:"arshad",
        user_type:"n",
        password:"12",
        email:"nn",
    });

    let result =await user.save();

        if(result){ 
        res.send(result);
        }else{
         res.send("erro");
        }

     


}

const findUser=(req,res)=>
{
  let {name,password}=req.params;
   usersModel.find({first_name:name,password:password},(err,result)=>{
   console.log(result);
   console.log(err);
   res.send(result);    
}) 

    

}


export {createUser,findUser }