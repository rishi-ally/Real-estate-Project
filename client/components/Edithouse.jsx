import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Upload, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const backend = import.meta.env.VITE_REACT_APP_BASE_URL;

const Edithouse = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHouseDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backend}/api/getedithouse/${id}`, { withCredentials: true });
        const { title, location, price, description, image } = response.data;
        console.log(response.data)
        setTitle(title);
        setLocation(location);
        setPrice(price);
        setDescription(description);
        setImagePreview(`${backend}${image}`);
      } catch (err) {
        setError('Failed to fetch house details.');
      } finally {
        setLoading(false);
      }
    };
    fetchHouseDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('description', description);
  formData.append('image', image);

    try {
     const response= await axios.put(`${backend}/api/edituserhouse/${id}`, formData, { withCredentials: true });
      alert('House updated successfully!');
      console.log('response is',response)
      navigate('/');
    } catch (err) {
      setError('Failed to update house.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <motion.div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Edit Your House 🏡</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {loading ? (
          <div className="flex justify-center">
            <Loader className="animate-spin w-10 h-10 text-blue-500" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div>
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <Upload className="w-5 h-5" /> Edit Image
                <input type="file" onChange={handleImageChange} className="hidden" />
              </label>
              {imagePreview && (
                <motion.img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full mt-4 rounded-lg shadow-lg object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white text-lg py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:bg-blue-300"
            >
              {loading ? 'Updating...' : 'Update House ✨'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Edithouse;
