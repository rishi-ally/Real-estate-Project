import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./redux-toolit";



const url = import.meta.env.VITE_REACT_APP_BASE_URL;

const Profile = () => {
  const [loginuser, setloginuser] = useState();
  const user = useSelector((state) => state.Itemslice.currentLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
console.log("in profile page",user);
  useEffect(() => {
    const fetchaxios = async () => {
      try {
        const response = await axios.get(`${url}/api/user/${user._id}`);
        console.log("abe",response)
        setloginuser(response.data.msg);
      } catch (error) {
        console.log("Error while fetching user:", error);
      }
    };
    fetchaxios();
  }, [user]);

  // Logout function
  const logout = async () => {
    try {
     
    const response=  await axios.post(`${url}/api/logout`,{},{
      withCredentials: true, 
    });
console.log(response)
dispatch(logoutUser());
   
      navigate("/");
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };
  
  return (
    !loginuser ? (
      <div className="text-white text-lg">Loading profile...</div>
    ) : (
      <>
        <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#111122] p-6 pt-20 flex items-center justify-center flex-col">
          {/* Profile Section */}
          <div className="relative bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-white/20 overflow-hidden">
            {/* Profile Image + Basic Info */}
            <div className="flex flex-col items-center mb-8 space-y-4">
              <div className="relative group">
              <img
  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${loginuser.username}`}
  alt="User Avatar"
  className="h-[15vh] w-[15vh] rounded-full border-amber-50 border-2"
/>
      
                <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <h2 className="text-4xl font-semibold text-white">{loginuser.username}</h2>
              <p className="text-gray-300 text-lg">{loginuser.email}</p>
              <p className="text-gray-400 text-sm">+91-{loginuser.phone}</p>
            </div>

            {/* Role and Status */}
            <div className="mb-6 bg-gradient-to-r from-[#1e1e2e] to-[#111122] p-6 rounded-lg shadow-xl border-2 border-b-gray-800">
              <h3 className="text-2xl font-semibold text-white mb-2">Role and Status</h3>
              <p className="text-sm md:text-base text-gray-300">Role: {loginuser.role}</p>
              <p className="text-sm md:text-base text-gray-300">Status: {loginuser.status}</p>
            </div>

            {/* Bio Section */}
            <div className="mb-6 bg-gradient-to-r from-[#1e1e2e] to-[#111122] p-6 rounded-lg shadow-xl border-2 border-b-gray-800">
              <h3 className="text-2xl font-semibold text-white mb-2">More About Me</h3>
              <p className="text-sm md:text-base text-gray-300">{loginuser.bio || "This user hasn't updated their bio yet."}</p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-center text-white">
              <div className="p-4 bg-white/20 rounded-xl shadow-lg transition-all hover:bg-blue-500">
                <h3 className="text-2xl font-bold">50K</h3>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="p-4 bg-white/20 rounded-xl shadow-lg transition-all hover:bg-blue-500">
                <h3 className="text-2xl font-bold">150</h3>
                <p className="text-sm text-gray-400">Projects</p>
              </div>
              <div className="p-4 bg-white/20 rounded-xl shadow-lg transition-all hover:bg-blue-500">
                <h3 className="text-2xl font-bold">98%</h3>
                <p className="text-sm text-gray-400">Success Rate</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mb-8">
          
              {/* Logout Button */}
              <button 
                onClick={logout} 
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-full shadow-lg transition-all hover:bg-red-500 hover:scale-105"
              >
                Logout
              </button>
            </div>

            {/* About Section */}
            <div className="text-gray-300 text-center text-sm space-y-2">
              <p>🚀 Passionate about building scalable web apps and exploring AI.</p>
              <p>🌍 Open for collaborations and freelance projects.</p>
              <p>🎨 In love with creative design and exploring new tech.</p>
            </div>
          </div>

          {/* Listings Section (Below Profile) */}
          <div className="w-full max-w-4xl mt-12 bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <h3 className="text-3xl font-semibold text-white mb-4">My Listings</h3>
            <a
      href="/addhome"
      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all"
    >
      Add a Home
    </a>
            <div className="space-y-6">
              {loginuser.listings && loginuser.listings.length > 0 ? (
                loginuser.listings.map((listing, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row mt-[2vh] bg-white/20 rounded-2xl overflow-hidden shadow-lg"
                  >
                  
                    <img
                      src={`${url}${listing.image}`}
                      alt={listing.title}
                      className="w-full md:w-1/3 h-56 object-cover"
                    />
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="text-2xl font-bold text-white">{listing.title}</h4>
                        <p className="text-gray-300 mt-2">{listing.description}</p>
                        <p className="text-gray-400 mt-2">
                          <strong>Location:</strong> {listing.location}
                        </p>
                        <p className="text-gray-400">
                          <strong>Price:</strong> ₹{listing.price}
                        </p>
                      </div>
                      <p className="text-gray-400 mt-4">
                        <strong>Host ID:</strong> {listing.host}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-300">
                  You haven't added any listings yet.
               
                </div>
              )}
            </div>
          </div>

          {/* Wishlist Section (user ka favs) */}
          <div className="w-full max-w-7xl mt-12 bg-white/10 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
  <h3 className="text-3xl font-semibold text-white mb-8">My Wishlist</h3>
  {loginuser.wishlist && loginuser.wishlist.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {loginuser.wishlist.map((item, index) => (
        <div
          key={index}
          className="bg-white/20 overflow-auto p-4 rounded-2xl shadow-lg backdrop-blur-md text-gray-300"
          style={{ width: "30vh", height: "60vh" }}
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-1/2 object-cover rounded-2xl mb-4"
          />
          <h4 className="text-lg font-semibold text-white truncate">{item.title}</h4>
          <p className="text-sm truncate">{item.location} • {item.price}</p>
          <p className="text-xs mt-2 h-16 overflow-hidden">{item.description}</p>
          <div className="mt-2">
            <h5 className="font-semibold text-white text-sm">Amenities:</h5>
            <ul className="list-disc ml-5 text-xs overflow-hidden h-12">
              {item.amenities.map((amenity, i) => (
                <li key={i}>{amenity}</li>
              ))}
            </ul>
          </div>
          <p className="text-xs mt-1">Interested: {item.interestedCount} users</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-sm text-gray-300">
      You haven't marked anything as a favorite yet.
      <p className="mt-4">Explore homes and mark them as favorite.</p>
    </div>
  )}
</div>


        </div>
      </>
    )
  );
};

export default Profile;
