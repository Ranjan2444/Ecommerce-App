import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminPanel = () => {
  const { products, loading, setProducts } = useContext(ProductContext);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle redirection if the user is not an admin
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate('/'); // Redirect to homepage or other page if user is not an admin
    }
  }, [user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
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
    <div>
      <h1>Admin Panel</h1>
      <button className="add-product-btn" onClick={handleAddProductClick}>
        Add Product
      </button>
      <h3>Product List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            <button onClick={() => handleEditProductClick(product.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
