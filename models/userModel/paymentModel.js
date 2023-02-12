import mongoose from "mongoose";

const payment=mongoose.Schema({
      payment_to:{type:String},
      payment_from:{type:String},
      amount:{type:String},
      date:{type:String},
      time:{type:String},
      

});

const paymentModel=mongoose.model("payment",payment);

export {paymentModel}