import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const HostProfile = () => {
  const houseId = useSelector((state) => state.Itemslice.currentItemInfo);
  const [host, setHost] = useState(null);

  const fetchHouseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/house/${houseId}`,
        { withCredentials: true }
      );
      
      const hostResponse = await axios.get(
        `http://localhost:5000/api/host/${response.data.hostId}`,
        { withCredentials: true }
      );
      setHost(hostResponse.data); 
  
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You must log in first! 🚫");
      } else {
        console.error("Error fetching house details:", error);
      }
    }
  };

  useEffect(() => {
    if (houseId) {
      fetchHouseDetails();
    }
  }, [houseId]);

  if (!host) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6 pt-[10rem] flex items-center justify-center">
      <div className="relative bg-gray-900 text-white p-10 rounded-3xl shadow-2xl w-full max-w-5xl border border-gray-700 overflow-hidden">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="relative">
            <img
              src={host.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-gray-500 shadow-lg transform hover:scale-105 transition"
            />
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800"></span>
          </div>
          <h2 className="text-3xl font-bold">{host.name}</h2>
          <p className="text-gray-400 text-lg">{host.email}</p>
          <p className="text-gray-500 text-sm">📞{host.phone}</p>
        </div>

        <div className="mb-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-2xl font-semibold mb-2">Host’s Bio</h3>
          <p className="text-gray-400">{host.bio || "No bio available."}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="p-4 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">{host.rating || "N/A"}</h3>
            <p className="text-sm text-gray-400">Rating</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">{host.listings.length || 0}</h3>
            <p className="text-sm text-gray-400">Listings</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold">Verified</h3>
            <p className="text-sm text-gray-400">✔️</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-500">Follow</button>
          <button className="px-6 py-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-600">contact</button>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Listings by {host.name}</h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {host.listings.length > 0 ? (
              host.listings.map((listing, index) => (
                <div key={index} className="bg-gray-800 rounded-lg shadow-lg p-6 hover:scale-105 transform transition duration-300 ease-in-out">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-bold text-gray-200">{listing.title}</h4>
                  <p className="text-sm text-gray-400">{listing.location}</p>
                  <p className="text-lg text-gray-500">{listing.price}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-400">{listing.amenities.join(', ')}</span>
                    <span className="text-sm text-gray-400">{listing.availabilityStatus}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No listings available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
