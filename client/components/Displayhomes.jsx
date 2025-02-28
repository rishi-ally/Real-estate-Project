import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setvalue } from './redux-toolit/index';
import { useLocation, useNavigate } from 'react-router-dom';
const url= import.meta.env.VITE_REACT_APP_BASE_URL;
const Displayhomes = () => {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const searchParam = new URLSearchParams(location.search);
    const searchQuery = searchParam.get("query");

    const fetchHomes = async () => {
      try {
       
        if (searchQuery) {
          const response = await axios.get(`${url}/api/query/${searchQuery}`);
          setHouses(response.data.msg);  
        } else {
          // if like user is not seacrhed anything then i should let user fetch homes(default)
          const response = await axios.get(`${url}/api/home`);
          setHouses(response.data);  // Set houses with all available data
         
        }
      } catch (error) {
        console.log("Error in Displayhomes while fetching:", error);
      }
    };

    fetchHomes(); 

  }, [location.search]);  

  const handleViewDetails = (homeId) => {
    console.log(`hey there this is the id you sent: ${homeId}`);
    dispatch(setvalue(homeId));
    navigate('/house-info');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 mt-[6rem] bg-gray-600 min-h-screen">
      {houses.map((house) => (
        <HouseCard key={house._id} house={house} handleViewDetails={handleViewDetails} />
      ))}
    </div>
  );
};

const HouseCard = ({ house, handleViewDetails }) => {
  const [interestedCount, setInterestedCount] = useState(house.interestedCount);
  const [isInterested, setIsInterested] = useState(null);

  const handlefav = async (houseid) => {
    try {
      const response = await axios.get(
        `${url}/api/addtofav/${houseid}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert(response.data.msg); //  "Added to favorites!"
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.msg); //  "House is already in your favorites!"
      } else {
        console.log("Error while adding to favorites:", error);
        alert("Something went wrong. Try again!");
      }
    }
  };

  return (
    <div className="w-full bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 transform transition-all hover:scale-101 duration-200">
      <img className="w-full h-64 object-cover" src={house.image} alt={house.title} />

      <div className="p-6 bg-gray-800">
        <h2 className="text-3xl font-extrabold text-white"> {house.price.toLocaleString()}</h2>
        <p className="text-lg font-medium text-gray-300 mt-1 flex items-center">
          📍 <span className="ml-1">{house.location}</span>
        </p>

        <p className="mt-3 text-lg text-gray-200 font-medium">
          <span className="font-semibold">{house.title}</span>
        </p>

        <div className="mt-4 flex items-center space-x-3 text-lg font-semibold">
          <span className="text-gray-400">👀 {interestedCount} people interested</span>
        </div>

        <div className="mt-5 flex gap-4">
          <button
            className={`flex-1 px-4 py-3 rounded-xl text-lg font-semibold text-white shadow-md transition-all duration-300 ${isInterested === true ? "bg-green-600" : "bg-gray-700 hover:bg-green-500"}`}
            onClick={() => handlefav(house._id)}
          >
            ✅ Interested
          </button>

          <button
            className={`flex-1 px-4 py-3 rounded-xl text-lg font-semibold text-white shadow-md transition-all duration-300 ${isInterested === false ? "bg-red-600" : "bg-gray-700 hover:bg-red-500"}`}
            onClick={() => {
              if (isInterested === true) setInterestedCount(interestedCount - 1);
              setIsInterested(false);
            }}
          >
            ❌ Not Interested
          </button>
        </div>

        <button
          className="mt-5 w-full bg-blue-700 text-white py-3 text-lg font-bold rounded-xl shadow-md hover:bg-blue-800 transition-all duration-300"
          onClick={() => handleViewDetails(house._id)}
        >
          🔍 View Details
        </button>
      </div>
    </div>
  );
};

export default Displayhomes;
