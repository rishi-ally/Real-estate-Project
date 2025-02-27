import React, { useState } from "react";
import logo from "../src/assets/house.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setloginuser, setUseractive } from "./redux-toolit";
const Page2 = () => {
  const [bio, setbio] = useState("");
  const [phone, setphone] = useState("");

  const navigate = useNavigate();
const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register/page2", {
        bio,
        phone,
      },{withCredentials:true});
      console.log("Registration successful:", response.data);
      alert("Account created successfully!");
      dispatch(setUseractive(true))
      dispatch(setloginuser(response.data.user))
      
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="UrbanKey" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">UrbanKey Wants to know More about you!</h2>
        <p className="text-gray-500 text-center mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Your Phone No.</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Phone number eg-+91********"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Your Bio</label>
            <textarea
  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
  placeholder="Tell us more about yourself..."
  value={bio}
  onChange={(e) => setbio(e.target.value)}
  required
></textarea>

          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition transform duration-300 hover:scale-105 shadow-lg"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page2