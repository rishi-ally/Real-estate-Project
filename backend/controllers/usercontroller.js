const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/usermodel"); 
require("dotenv").config(); 
const secretKey = process.env.JWT_SECRET;
const House = require("../models/House");
const jwt = require("jsonwebtoken"); 
const Host = require("../models/Host");
const Userhouse = require("../models/Userhouse");
const path=require('path')
const fs=require('fs');
const Query = require("../models/Query");
exports.gethome = async (req, res) => {
  try {
    const house = await House.find().populate("hostId", "name email");
    res.json(house);
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ msg: "Server error" }); 
  }
};
exports.registeruser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
  
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({ username, email, password: hashedPassword ,status:"pending"});
    await newUser.save();


    req.session.user = {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    res.status(200).json({ msg: "User registered successfully", user: req.session.user });
  } catch (error) {
    console.error("Registration Error:", error.message);
    res.status(500).json({ msg: "Error while registering", error: error.message });
  }
};
exports.loginuser = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const userExists = await User.findOne({ email });
    console.log(`userexist bhaiiiiii`,userExists)
    if (!userExists) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    
    req.session.user = {
      id: userExists._id,
      username: userExists.username,
      email: userExists.email,
    };
const user=await User.findById(req.session.user.id);
console.log("tere dmage vala",user)
    res.status(200).json({ msg: "Login successful", user});
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ msg: "Error while logging in", error: error.message });
  }
};
exports.gethomeById = async (req, res) => {
  const houseid = req.params.id;

  try {
    const house = await House.findById(houseid)
 
  


    if (!house) {
      return res.status(404).json({ msg: "House not found" });
    }

    res.json(house);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ msg: "Server error" }); 
  }
};
exports.step2register=async(req,res)=>{
  try{

if(!req.session.user.id){return res.status(401).json({msg:"unAuthorized😡"}) }
const{bio,phone}=req.body;
const updateduser=await User.findByIdAndUpdate(req.session.user.id,{bio,phone,status:"active"},{new:true});
return  res.json({ message: "Account created successfully!", user: updateduser });
} catch (error) {
  res.status(500).json({ message: "Server error", error });
}




}


exports.gethost= async (req,res)=>{
const hostId=req.params.id
try{
  const foundhost=await Host.findById(hostId).populate('listings')
if(!foundhost){
  return res.status(404).json({msg:"No host found!"})
}

res.json(foundhost)
}
catch(error){
  console.error("Error:", error); 
  res.status(500).json({ msg: "Server error" }); 
}


}
exports.addHome = async (req, res) => {

  
  try {
   
    const { title, price, location,description } = req.body;
    console.log('req.body:', req.body);  
console.log('req.file:', req.file);  

    const imagePath = `/uploads/${req.file.filename}`;

   
    const newHouse = new Userhouse({
      title,
      price,
      location,
      description,
      image: imagePath,
      host: req.session.user.id,
    });
const user=await User.findById(req.session.user.id);
user.listings.push(newHouse._id);
await user.save();
    await newHouse.save();
    res.status(201).json({ message: 'House uploaded successfully!', house: newHouse });
  } catch (error) {
    console.error('❌ Error in /uploadhouse:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
exports.getuserhomes=async (req,res) => {
 console.log( 'session user-',req.session.user)


  try{
//const houses= await Userhouse.find().populate('host');
const user=await User.findById(req.session.user.id).populate('listings')
res.json(user)
  }catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ msg: "Server error" });
  }
}
exports.deleteuser = async (req, res) => {
  try {
    const houseid = req.params.id;
        const user = await User.findById(req.session.user.id);
        user.listings = user.listings.filter(id => id.toString() !== houseid.toString());

     
        await user.save();
    const deletedHouse = await Userhouse.deleteOne({ _id: houseid });

 
    
   

    if (deletedHouse.deletedCount > 0) {
      return res.status(200).json({ message: 'House deleted successfully' });
    } else {
      return res.status(404).json({ message: 'No house found with that ID' });
    }

  } catch (error) {
    return res.status(500).json({ msg: "House cannot be deleted!" }); 
  }
};
exports.getloggedinuser=async(req,res)=>{

try{
const user=req.params.id;
const foundUser = await User.findById(user).populate('listings').populate('wishlist');


res.json({msg:foundUser})


}catch(error){
  return res.status(500).json({ msg: "user cant found!" }); 
}



}
exports.addtofav = async (req, res) => {
  try {
    const userid = req.session.user.id;
    const user = await User.findById(userid);
    const favhouseid = req.params.id;

  
    if (user.wishlist.includes(favhouseid)) {
      return res.status(400).json({ msg: "House is already in your favorites!" });
    }

    user.wishlist.push(favhouseid);
    await user.save();
    res.status(200).json({ msg: "Added to favorites!" });
  } catch (error) {
    res.status(500).json({ msg: "Error while adding to favorites." });
  }
};
exports.getfavs=async(req,res)=>{
try{
const user=req.session.user.id;
const favs=await User.findById(user).populate('wishlist')
console.log(favs)
res.json({msg:favs})
}catch(error){

  res.status(500).json({ msg: "Error while fectching favorites." });
}
}
exports.removefav=async(req,res)=>{
  try{
  const user=req.session.user.id;
  const houseid=req.params.id;
  const loggedinuser=await User.findById(user);
  loggedinuser.wishlist = loggedinuser.wishlist.filter(id => id.toString() !== houseid.toString());
  await loggedinuser.save()
  return res.status(200).json({ message: 'House deleted successfully' });
  }
  catch(error){
    return res.status(500).json({ msg: "House cannot be deleted!" });
  }



}
exports.fetchedithouse=async(req,res)=>{
try{
  const id=req.params.id;
const housefound=await Userhouse.findById(id)
res.json(housefound)
}
catch(error){
res.status(500).json({msg:"cant find house to be edit"})
}


}
exports. editHouse = async (req, res) => {
  const { id } = req.params;
  const { title, location, price, description } = req.body;
  let imagePath = ''; 
  try {
  
    const house = await Userhouse.findById(id);
    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

   
    if (req.file) {
    
      if (house.image) {
        const oldImagePath = path.join(__dirname, '..', house.image); 
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      
      imagePath = house.image;
    }

   
    house.title = title || house.title;
    house.location = location || house.location;
    house.price = price || house.price;
    house.description = description || house.description;
    house.image = imagePath;

   
    await house.save();

 
    res.status(200).json({ message: 'House updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update house.' });
  }
};

exports.logout = async (req, res) => {
  try {

  

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ msg: "Error while logging out", error: err.message });
      }

      
      res.status(200).json({ msg: "User logged out and deleted successfully" });
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    res.status(500).json({ msg: "Error while logging out", error: error.message });
  }
};
exports.postquery=async (req,res)=>{
try{const { hostId, house, queryText } = req.body;
const query=new Query({
  hostid:hostId,       
  userid:req.session.user.id,   
  house:house,
  quertext:queryText,   
  status:true
})
await query.save();
res.json({query})
}
catch(error){
  res.status(400).json({msg:'error cant post the query',error:error.message})
}


}
exports.getqueries=async(req,res)=>{
  try{
const foundquery=await Query.find({userid:req.session.user.id}).populate('hostid').populate('house');
res.json(foundquery)
  }
  catch(error){
res.status(400).json({msg:'no query found'})
  }
}
exports.deletequery=async(req,res)=>{
  const id=req.params.id;
  try{
const deletedquery=await Query.deleteOne({_id:id});
if(deletedquery.deletedCount>0){
  res.status(202).json({msg:"query deleted successfully"});
  
}
else{
  res.status(400).json({msg:"query not found"})
}
  }
  catch(error){
res.status(500).json({msg:"error in finding query"})
  }
}
exports.getqueryresults=async(req,res)=>{
const {house}=req.params;
try{
  const houses = await House.find({
    $or: [
      { location: { $regex: house, $options: 'i' } } 
    ]
  });
res.status(200).json({msg:houses})
}
catch(error){
  res.status(500).json({msg:"no house found"})
}



}