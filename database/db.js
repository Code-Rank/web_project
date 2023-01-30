import mongoose from "mongoose";

const connection=(uri)=>{
    mongoose.connect(uri).then(()=>{
        console.log("connect to database");
    }).catch((err)=>{
        console.log(err)
    });
}

export {connection}