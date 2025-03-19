// src/pages/AddProductPage.jsx

import React, { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';

const AddProductPage = () => {
  const {user} = useContext(AuthContext);  
  const { addProduct,loading } = useContext(ProductContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  //  // Local state to track if user data is loaded
  //   const [isUserLoaded, setIsUserLoaded] = useState(false);
   
  //   useEffect(() => {
  //     if (user !== null) {
  //       setIsUserLoaded(true); // User data is loaded, so we can check their role
  //     }
  //   }, [user]); // Run this effect when 'user' changes
   
  //   useEffect(() => {
  //     if (!isUserLoaded) {
  //       return; // Don't do anything until user data is loaded
  //     }
   
  //     if (!user) {
  //       navigate("/login"); // Redirect to login if no user is logged in
  //     } else if (user.role !== "ADMIN") {
  //       navigate("/"); // Redirect to home if not an admin
  //     }
  //   }, [isUserLoaded, user, navigate]);
   
  //   if (loading || !isUserLoaded) {
  //     return <div>Loading...</div>; // Show loading message until user data is available
  //   }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !image) {
      alert('All fields are required!');
      return;
    }

    const newProduct = {
      name,
      price: parseFloat(price),
      image,
    };

    // Call the addProduct function from ProductContext to add the new product
    await addProduct(newProduct);

    // Redirect to the admin panel after adding the product
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8">
      <div className="flex justify-center">
      <h1 className="text-xl font-semibold mb-4 text-gray-200">Add New Product</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2 bg-gray-100 text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-300">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2 bg-gray-100 text-black"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2 bg-gray-100 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
      </div>
      </div>
  );
};

export default AddProductPage;
