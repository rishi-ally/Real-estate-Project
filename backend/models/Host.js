const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const HostSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }] 
});

module.exports = mongoose.model("Host", HostSchema); 