import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setvalue } from "./redux-toolit";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
const url= import.meta.env.VITE_REACT_APP_BASE_URL;
const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const disaptch=useDispatch();
  const navigate=useNavigate();
const handleVisitHost=async(houseid)=>{
disaptch(setvalue(houseid))
navigate('/hostprofile')
}

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${url}/api/getfavs`, {
          withCredentials: true,
        });
        setFavorites(response.data.msg.wishlist);
        console.log(response.data.msg.wishlist)
      } catch (error) {
        console.log("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleRemove = async (houseId) => {
    try {
  const res=    await axios.get(`${url}/api/removefav/${houseId}`, {
        withCredentials: true,
      });
      setFavorites(favorites.filter((house) => house._id !== houseId));
      if(res.status==200){
        alert("house is removed from favourites")
      }
    } catch (error) {
      console.log("Error removing from favorites:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );
  }

  return (
    <>
    <div className="p-8 min-h-screen bg-gray-50 pt-[10rem]">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">❤️ Your Favorite Houses</h2>
      {favorites.length === 0 ? (
        <p className="text-lg text-gray-600">No favorites yet. Start adding some! 💖</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((house) => (
            <motion.div
              key={house._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={house.image}
                alt={house.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {house.title}
                </h3>
                <p className="text-gray-600 mb-2">{house.location}</p>
                <p className="text-green-600 font-semibold text-lg mb-4">
                  {house.price}
                </p>
                <a
                  variant="destructive"
                  className="w-full flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => handleRemove(house._id)}
                >
                  <Heart className="w-5 h-5" /> Remove from Favorites
                </a>
              </div>
              <button
  className="w-full flex items-center justify-center gap-2 mt-2 px-6 py-2 bg-green-400 text-white rounded-lg hover:bg-green-300"
  onClick={() => handleVisitHost(house._id)}
>
  Visit Host
</button>

            </motion.div>
          ))}
        </div>
      )}
    </div>
    <Footer></Footer>
  </>);
};

export default Favourites;
