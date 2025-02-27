const mongoose=require('mongoose');
const Houseschema=new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
description:{type:String},
host:{
 type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true


}





})

module.exports=mongoose.model("Userhouse",Houseschema);