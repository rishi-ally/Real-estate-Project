import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ConfirmationModal from './ConfirmationModal';
const backend = import.meta.env.VITE_REACT_APP_BASE_URL;

const Userquery = () => {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const[open,setOpen]=useState(false);
const[querytodelete,setquerytodelete]=useState(null)
  
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${backend}/api/getuserqueries`, {
          withCredentials: true,
        });
        setQueries(response.data);
      } catch (error) {
        setError('Error fetching queries');
        console.log('error in fetch queries', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQueries();
  }, []);


  const handleDeleteconfirm = async () => {
  
    try {
      await axios.delete(`${backend}/api/deletequery/${querytodelete}`, {
        withCredentials: true,
      });
    
      setQueries(queries.filter(query => query._id !== querytodelete));
    } catch (error) {
      console.log('Error deleting query', error);
      setError('Error deleting query');
    }
    setOpen(false)
  };
  const handleDeleteclick=(queryid)=>{
setOpen(true);
setquerytodelete(queryid)

  }
const handlecancel=()=>{
setOpen(false);
}
  if (loading) {
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
   <> <div className="min-h-screen bg-gray-900 py-10">
      <div className="container mx-auto px-6 mt-[8rem]">
        <h2 className="text-3xl text-white font-extrabold text-center mb-6">
          Your Queries & Responses
        </h2>

        {queries.length === 0 ? (
          <div className="text-center text-white font-semibold text-lg">
            No queries found!
          </div>
        ) : (
          queries.map((query) => (
            <div
              key={query._id}
              className="bg-gray-800 rounded-xl shadow-lg mb-6 p-6 flex flex-col md:flex-row gap-6"
            >
              <div className="w-full md:w-1/3 flex justify-center items-center">
                <img
                  src={query.house.image || 'https://via.placeholder.com/300'}
                  alt="House"
                  className="w-full h-48 rounded-lg object-cover"
                />
              </div>

              <div className="flex flex-col justify-between w-full md:w-2/3">
                <h3 className="text-2xl font-semibold text-white">
                  {query.house.title}
                  
                </h3>
                
                <div className="mt-2 bg-gray-700 p-4 rounded-lg">
                  <p className="text-lg text-gray-200">{query.quertext}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <img
                      src={query.hostid.profileImage || 'https://via.placeholder.com/50'}
                      alt="Host"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="text-sm text-gray-400">
                      Posted to: <span className="font-semibold">{query.hostid.name}</span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-400">{query.status ? 'Resolved' : 'Pending'}</p>
                </div>

                {/* Delete button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleDeleteclick(query._id)}
                    className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
                  >
                   Delete this query
                  </button>
                </div>
              </div>
              
            </div>
          ))
        )}
      </div>
    </div>
    <ConfirmationModal isOpen={open}  onClose={handlecancel} onConfirm={handleDeleteconfirm}></ConfirmationModal>
    </>
  );
};

export default Userquery;
