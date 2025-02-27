import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QueryPage = () => {
  const { houseId } = useParams();

  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [queryText, setQueryText] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const url= import.meta.env.VITE_REACT_APP_BASE_URL;
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`${url}/api/house/${houseId}`,{
          withCredentials:true
        });
        console.log(response)
        setHouse(response.data);
      } catch (err) {
        setError('An error occurred while fetching house details.');
      } finally {
        setLoading(false);
      }
    };
    fetchHouseDetails();
  }, [houseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
   const response=   await axios.post(`${url}/api/queries`, {
        hostId: house.hostId,
        house: houseId,
        queryText,
      },{withCredentials:true});
      console.log('post sumbimteeed',response)
      setSuccess(true);
      setQueryText('');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('An error occurred while submitting the query.');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading house details...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="mt-[8vh] min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl w-full h-[90vh] overflow-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6 text-center">
          Connect with the Host for <span className="text-indigo-600">{house?.title}</span>
        </h2>
        <p className="text-center text-gray-600 mb-8 text-lg">
          Have any questions about this property? Feel free to ask! The host will get back to you shortly.
        </p>
        <div className="mb-8 flex flex-col md:flex-row gap-8 items-center">
          <img
            src={house?.image || 'https://via.placeholder.com/400'}
            alt={house?.title}
            className="w-full md:w-1/2 rounded-3xl shadow-xl border border-gray-200"
          />
          <div className="text-gray-800 w-full md:w-1/2 space-y-4">
            <p className="text-lg font-semibold">📍 Location: {house?.location}</p>
            <p className="text-lg font-semibold">💰 Price: {house?.price}</p>
            <p className="text-base leading-relaxed">{house?.description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            className="w-full p-5 border-2 border-gray-300 rounded-3xl shadow focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all text-gray-700 text-lg"
            rows="6"
            placeholder="Type your question here... (e.g., Is the house available for monthly rent? Are pets allowed?)"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            required
          />
       <button
  type="submit"
  className="w-full bg-gradient-to-r from-indigo-800 to-gray-800 text-white py-4 rounded-3xl text-lg font-bold hover:from-indigo-900 hover:to-gray-900 transition duration-300 shadow-xl"
>
  ✉️ Submit Your Query
</button>
        </form>
        {success && (
          <p className="mt-6 text-green-500 text-center text-lg font-semibold">
            ✅ Query submitted successfully! Redirecting to the homepage...
          </p>
        )}
        {error && (
          <p className="mt-6 text-red-500 text-center text-lg font-semibold">{error}</p>
        )}
      </div>
    </div>
  );
};

export default QueryPage;
