const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  interestedCount: { type: Number, default: 0 },  
  amenities: { type: [String], default: [] }, 
  image: { type: String },
  description: { type: String },
  availabilityStatus: { type: String, enum: ["Available", "Unavailable", "Pending"], default: "Available" },
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Host',
    required: true
  }
  
});

module.exports = mongoose.model("Property", propertySchema); 
