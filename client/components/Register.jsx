import React, { useState } from "react";
import logo from "../src/assets/house.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setloginuser, setUseractive } from "./redux-toolit";
const url= import.meta.env.VITE_REACT_APP_BASE_URL;
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const dispatch=useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/register`, {
        username,
        email,
        password,
      },{withCredentials:true});
      console.log("Registration successful for step 1:", response.data);
     // dispatch(setUseractive(true))
    //dispatch(setloginuser(response.data.user))
      
      navigate("/register/page2");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("User already exists!");
      } else {
        console.error("Registration failed:", error.response?.data || error.message);
        alert("Error: " + (error.response?.data?.message || "Something went wrong"));
      }
       }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform transition duration-500 hover:scale-105">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="UrbanKey" className="h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">Join UrbanKey</h2>
        <p className="text-gray-500 text-center mb-6">Create your account</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium">Username</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition transform duration-300 hover:scale-105 shadow-lg"
          >
          Next
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? {" "}
          <a href="/login" className="text-blue-500 hover:underline transition duration-200">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
