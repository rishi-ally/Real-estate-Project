import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const AddHome = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
const navigate=useNavigate()
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('description', description);
    if (image) formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/uploadhouse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      setSuccessMessage('House added successfully!');
      setTitle('');
      setLocation('');
      setPrice('');
      setDescription('');
      setImage(null);
      setImagePreview(null);
navigate("/userhomes")
    } catch (error) {
      navigate('/register')
      setError('Error uploading the house!');
      console.log(error);
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
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New House</h1>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}

          {/* Title */}
          <div>
            <label className="block text-gray-600">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-600">Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-600">Price:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-600">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-600">Image:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Image Preview" className="w-32 h-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add House
            </button>
          </div>
        </form>
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default AddHome;
