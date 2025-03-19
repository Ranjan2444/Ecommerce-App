import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { products, loading, setProducts } = useContext(ProductContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

    // Local state to track if user data is loaded
    const [isUserLoaded, setIsUserLoaded] = useState(false);
   
    useEffect(() => {
      if (user !== null) {
        setIsUserLoaded(true); // User data is loaded, so we can check their role
      }
    }, [user]); // Run this effect when 'user' changes
   
    useEffect(() => {
      if (!isUserLoaded) {
        return; // Don't do anything until user data is loaded
      }
   
      if (!user) {
        navigate("/login"); // Redirect to login if no user is logged in
      } else if (user.role !== "ADMIN") {
        navigate("/"); // Redirect to home if not an admin
      }
    }, [isUserLoaded, user, navigate]);
   
   
    if (loading || !isUserLoaded) {
      return <div>Loading...</div>; // Show loading message until user data is available
    }

  const handleAddProductClick = () => {
    navigate('/add-product'); // Navigate to /add-product route when button is clicked
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Remove product from the state after deletion
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEditProductClick = (id) => {
    // Navigate to /edit-product with the product ID to edit
    navigate(`/edit-product/${id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Admin Panel</h1>
      {/* Add Product Button */}
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={handleAddProductClick}
      >
        Add Product
      </button>

      {/* Product List */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-700">Product List</h3>
        <ul className="space-y-4 mt-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="flex justify-between items-center p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                <p className="text-gray-600">${product.price}</p>
              </div>
              <div className="space-x-4">
                {/* Edit Button */}
                <button
                  onClick={() => handleEditProductClick(product.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                >
                  Edit
                </button>
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteProduct(product.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <a href="/" className="text-gray-500 hover:text-blue-500">
        <p>&larr; Go back to homepage</p>
      </a>
    </div>
  );
};

export default AdminPanel;
