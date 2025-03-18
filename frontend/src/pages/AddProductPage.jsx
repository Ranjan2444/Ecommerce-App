// src/pages/AddProductPage.jsx

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';

const AddProductPage = () => {
  const {user} = useContext(AuthContext);  
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  if (user && user.role !== 'ADMIN') {
    navigate('/'); // Redirect to homepage or other page if user is not an admin
  }

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
    <div className="max-w-md mx-auto p-6 border rounded-md">
      <h1 className="text-xl font-semibold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full p-2 border rounded-md mt-2"
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
  );
};

export default AddProductPage;
