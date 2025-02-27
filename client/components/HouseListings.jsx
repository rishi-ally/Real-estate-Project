import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal'
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { TbCalendarSad } from "react-icons/tb";
import Footer from './Footer';
const backend = import.meta.env.VITE_REACT_APP_BASE_URL;

const HouseListings = () => {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate(); 
const [open,setopen]=useState(false);
const [housetodelete,sethousetodelete]=useState(null)
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${backend}/api/userhomes`, {
          withCredentials: true,
        });
        console.log(response.data.listings)
       setHouses(response.data.listings);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  const handleDeleteclick = (houseid) => {
    setopen(true);
    sethousetodelete(houseid)
  };

  const handleEdit = (houseId) => {
    navigate(`/edit-house/${houseId}`); 
  };

  const handleDeleteconfirm = async () => {
    try {
      await axios.delete(`${backend}/api/delete/${housetodelete}`, {
        withCredentials: true,
      });
      setHouses(houses.filter(house => house._id !== housetodelete));
      console.log('House deleted');
    } catch (error) {
      console.error('Error deleting house:', error);
    }
    setopen(false);
  };
 const handlecancel =()=>{
  setopen(false)
 }
  return (
    <>
    <div className="bg-gray-900 text-white min-h-screen pt-[10rem] p-10">
      <div className='bg-gray-700 h-[10rem] p-7'> <h1 className="text-5xl font-extrabold text-center mb-4 tracking-wide">
        🏡 Your Stunning House Listings
      </h1>
      <p className="text-center text-lg text-gray-400 mb-10">
        Explore the homes you've added. Ready to find your next dream stay?
      </p>
     </div>
      <hr />

      {houses.length === 0 ? (
        <div className='flex flex-col justify-center items-center mt-[10rem]'>
          <div className="text-center text-gray-400 text-xl mt-20">
            <p className='text-2xl'>No listings found. 🌟 Be the first to add your dream house today!</p>
          </div>
          <TbCalendarSad className='h-[10rem] w-[30rem] mt-[5rem]' />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-[2vh]">
          {houses.map((house) => (
            <div
              key={house._id}
              className="bg-gray-800 shadow-2xl rounded-2xl p-6 flex flex-col space-y-5 hover:scale-101 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={`${backend}${house.image}`}
                  alt="House"
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white py-1 px-3 rounded-lg text-sm">
                  <p>
                    Created at:{' '}
                    {new Date(house.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-1">
                  {house.title}
                </h3>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <p className="text-md italic">{house.location}</p>
                </div>
              </div>

              
              <p className="text-gray-400 italic leading-relaxed text-sm break-words">
  "{house.description}"
</p>


              <div className="flex justify-between items-center mt-4">
                <span className="text-3xl font-semibold text-green-400">
                  ₹{house.price}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEdit(house._id)}
                    className="bg-yellow-600 text-white py-2 px-5 rounded-lg hover:bg-yellow-700 transition-all duration-300 shadow-md text-sm sm:text-base"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteclick(house._id)}
                    className="bg-red-600 text-white py-2 px-5 rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md text-sm sm:text-base"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    <ConfirmationModal isOpen={open} onClose={handlecancel} onConfirm={handleDeleteconfirm} ></ConfirmationModal>
   <Footer></Footer>
   
    </>
  );
};

export default HouseListings;
