const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  profileImage: { type: String, default: "default-profile.png" },
  phone: { type: String },
  bio: { type: String },

  role: { type: String, enum: ["user", "host"], default: "user" },
  listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Userhouse" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],

  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["active", "pending"], default: "active" }
});

module.exports = mongoose.model("User", userschema);
