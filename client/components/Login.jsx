import React, { useState } from "react";
import logo from "../src/assets/house.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setloginuser, setUseractive } from "./redux-toolit";

const url = import.meta.env.VITE_REACT_APP_BASE_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
const dispatch=useDispatch();
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await axios.post(`${url}/api/loginuser`, { email, password }, { withCredentials: true });
    console.log("API Response:", response);
    console.log("User Data:", response.data.user);

    if (response.data && response.data.user) {
      dispatch(setUseractive(true));
      dispatch(setloginuser(response.data.user));
      navigate('/');
    } else {
      console.log("User data not found in response.");
    }
  } catch (error) {
    console.log('Error while login:', error);
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-96 transition-all duration-300 hover:shadow-blue-400">
        <div className="flex items-center justify-center mb-4 space-x-2">
          <img src={logo} alt="UrbanKey" className="h-12" />
          <span className="text-2xl font-bold text-gray-800 flex items-center">
            UrbanKey
            <i className="fas fa-home text-blue-600 ml-2"></i>
          </span>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-6">Login to your UrbanKey account</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-full focus:ring focus:ring-blue-300 transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded-full focus:ring focus:ring-blue-300 transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-400 transition-all"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          First time here?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-semibold">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
