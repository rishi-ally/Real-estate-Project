const mongoose=require('mongoose');
const queryschema=new mongoose.Schema({
hostid:{    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host',
    required: true},
userid:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'User',
  required:true
},
quertext:{type:String,required:true},
status:{type:Boolean,required:true},
house:{  type:mongoose.Schema.Types.ObjectId,
  ref:'Property',
  required:true}

})
module.exports=mongoose.model('Query',queryschema)