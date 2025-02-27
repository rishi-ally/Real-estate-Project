import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt, FaRupeeSign, FaDoorOpen, FaDumbbell, FaShieldAlt, FaHome, FaUser } from "react-icons/fa";
import Footer from "./Footer";
const url= import.meta.env.VITE_REACT_APP_BASE_URL;
const Viewdetails = () => {
  const houseId = useSelector((state) => state.Itemslice.currentItemInfo);
  console.log(houseId)
  const navigate = useNavigate();
  const [host,sethost]=useState(false)
  const [house, setHouse] = useState(null);

  const amenityImages = {
    "Gym": "https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg",
    "Private Pool": "https://images.pexels.com/photos/261045/pexels-photo-261045.jpeg",
    "Sea View": "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg",
    "Terrace": "https://images.pexels.com/photos/1662549/pexels-photo-1662549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Lush Garden": "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
    "24x7 Security": "https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Parking": "https://images.pexels.com/photos/97075/pexels-photo-97075.jpeg",
    "Spa": "https://images.pexels.com/photos/38238/salt-therapy-relax-wellness-38238.jpeg",
    "Kids Play Area": "https://images.pexels.com/photos/1125641/pexels-photo-1125641.jpeg",
    "Balcony": "https://images.pexels.com/photos/3764151/pexels-photo-3764151.jpeg",
    "Garden": "https://images.pexels.com/photos/2134798/pexels-photo-2134798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Traditional Interiors": "https://images.pexels.com/photos/1031030/pexels-photo-1031030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Swimming Pool": "https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Clubhouse": "https://images.pexels.com/photos/30640568/pexels-photo-30640568/free-photo-of-energetic-nightclub-dj-set-with-vibrant-crowd.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Jacuzzi": "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Private Parking": "https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Lift": "https://images.pexels.com/photos/3861787/pexels-photo-3861787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Security": "https://images.pexels.com/photos/430208/pexels-photo-430208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
 
    "Waterfront": "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg",
    "Infinity Pool":"https://images.pexels.com/photos/235466/pexels-photo-235466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "Rooftop Deck":"https://images.pexels.com/photos/3204577/pexels-photo-3204577.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Home Theatre":"https://images.pexels.com/photos/1649683/pexels-photo-1649683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Smart Home":"https://media.istockphoto.com/id/957318796/photo/smart-home-automation-network-application-internet-technology.jpg?s=1024x1024&w=is&k=20&c=IGiDBW4rJBc-z5N-JCL3_pOupevIBtZHfApP4BHo__8=",
    "Private Elevator":"https://images.pexels.com/photos/3861787/pexels-photo-3861787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Sky Lounge":"https://images.pexels.com/photos/8588578/pexels-photo-8588578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Play Area":"https://images.pexels.com/photos/8422173/pexels-photo-8422173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Gated Society":"https://media.istockphoto.com/id/1018991602/photo/yellow-metal-gate.jpg?s=1024x1024&w=is&k=20&c=s42d1Wd9zqpNkIZw5_QBNIMdmklfxF1EpzviR6mNCmA=",
    "Power Backup":"https://media.istockphoto.com/id/1301976298/photo/two-stationary-gas-electric-generators.jpg?s=1024x1024&w=is&k=20&c=IGAr0Fgsoifxq7V7uppwkP0sF85ELg0WQvcWo9ZhGuM=",
    "Private Beach":"https://images.pexels.com/photos/25034161/pexels-photo-25034161/free-photo-of-a-table-set-for-a-romantic-dinner-on-the-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Sun Deck":"https://images.pexels.com/photos/30711281/pexels-photo-30711281/free-photo-of-woman-enjoying-a-stunning-beach-sunset-in-turkey.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Jogging Track":"https://images.pexels.com/photos/8692271/pexels-photo-8692271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "CCTV Security":"https://images.pexels.com/photos/6257849/pexels-photo-6257849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "24x7 Water Supply":"https://images.pexels.com/photos/4108676/pexels-photo-4108676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Modular Kitchen":"https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Organic Garden":"https://images.pexels.com/photos/1043458/pexels-photo-1043458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Helipad":"https://images.pexels.com/photos/8300721/pexels-photo-8300721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Gated Community":"https://media.istockphoto.com/id/1018991602/photo/yellow-metal-gate.jpg?s=1024x1024&w=is&k=20&c=s42d1Wd9zqpNkIZw5_QBNIMdmklfxF1EpzviR6mNCmA=",
    "Organic Farm":"https://images.pexels.com/photos/348689/pexels-photo-348689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Vineyard View":"https://images.pexels.com/photos/3373945/pexels-photo-3373945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Fireplace":"https://images.pexels.com/photos/4641208/pexels-photo-4641208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Wooden Interiors":"https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "Mountain View":"https://images.pexels.com/photos/4448859/pexels-photo-4448859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

  };

  const fetchHouseDetails = async () => {
    try {
      const response = await axios.get(`${url}/api/house/${houseId}`, { withCredentials: true });
      setHouse(response.data);
      console.log(house)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must log in first! 🚫");
        navigate("/register");
      } else {
        console.error("Error fetching house details:", error);
      }
    }
  };
   
 const handlehost=()=>{
  navigate('/hostprofile')
 } 

const handlequeryclick=(houseid)=>{
  navigate(`/queryfor/${houseid}`)
}
  useEffect(() => {
    fetchHouseDetails();
  }, [houseId]);

  if (!house) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <>
      <div className="w-full p-4 md:p-6 pt-[6rem] md:pt-[8rem] flex flex-col lg:flex-row gap-4 md:gap-8">
        <div className="flex-1 flex flex-col gap-6 md:gap-10">
          <div className="bg-gradient-to-r from-black to-blue-900 p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-10 rounded-xl shadow-lg">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative">
                <img
                  src={house.image}
                  alt={house.title}
                  className="h-[25rem] sm:h-[30rem] md:h-[35rem] lg:h-[40rem] w-full object-cover rounded-xl shadow-lg transition-all duration-300 hover:scale-101"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-green-500 text-white px-2 py-1 md:px-4 md:py-2 rounded text-sm md:text-lg font-semibold">
                  {house.availabilityStatus}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 p-4 md:p-[2rem] justify-center w-full mx-auto">
                <button 
                  onClick={handlehost}  
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-4 rounded-lg transition-all duration-300 w-full text-sm md:text-base"
                >
                  View Host Profile
                </button>
                <button onClick={()=>{
                  handlequeryclick(house._id)
                }} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 md:py-4 rounded-lg transition-all duration-300 w-full text-sm md:text-base">
                Got doubts? Send a query!
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-white p-4 md:p-6 w-full lg:w-[50rem] flex flex-col gap-4 md:gap-6 rounded-xl shadow-lg">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{house.title}</h1>
              <div className="text-base md:text-lg text-gray-600 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" /> {house.location}
              </div>
              <div className="text-xl md:text-2xl font-semibold flex items-center gap-1">
                <FaRupeeSign /> {house.price}
              </div>
              <p className="text-gray-700 text-sm md:text-lg leading-relaxed">{house.description}</p>
              
              <div className="my-2 md:my-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-800">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                  {house.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 p-2 md:p-3 rounded-lg shadow-md text-sm md:text-lg hover:bg-gray-200 transition-all duration-300">
                      {amenity === "Gym" && <FaDumbbell className="text-blue-500 text-xl md:text-2xl" />}
                      {amenity === "24x7 Security" && <FaShieldAlt className="text-green-500 text-xl md:text-2xl" />}
                      {amenity === "Balcony" && <FaHome className="text-yellow-500 text-xl md:text-2xl" />}
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center text-base md:text-lg font-medium text-gray-700">
                <FaDoorOpen className="text-blue-600 text-xl md:text-2xl mr-2" /> {house.interestedCount} people interested
              </div>
              <p className="text-gray-600 text-sm md:text-base italic bg-gray-100 p-3 md:p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                ✨ A home isn't just walls and a roof... (keep text the same)
              </p>
            </div>
          </div>

          {/* Important Info */}
          <div className="w-full bg-yellow-100 p-3 md:p-4 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">Important Information</h2>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Please note that the availability... (keep text the same)
            </p>
          </div>

          {/* Amenities Gallery */}
          <div className="mt-4 md:mt-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4 text-gray-800">Amenities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {house.amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="relative group flex flex-col items-center bg-gray-100 p-2 md:p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-200 transition-all duration-300"
                >
                  <img
                    src={amenityImages[amenity] || "https://via.placeholder.com/150"}
                    alt={amenity}
                    className="w-full h-[10rem] md:h-[15rem] object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="mt-2 md:mt-3 font-semibold text-sm md:text-lg text-gray-800 text-center">{amenity}</span>
                  <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white bg-black bg-opacity-60 w-full p-1 md:p-2 rounded-b-lg text-xs md:text-sm">
                    Learn More
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Viewdetails;
