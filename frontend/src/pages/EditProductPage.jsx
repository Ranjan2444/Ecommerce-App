import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { AuthContext } from '../context/AuthContext';

const EditProductPage = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const { token, user } = useContext(AuthContext);  // Get token and user from AuthContext
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState({ name: '', price: '', image: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirect if the user is not an admin
  useEffect(() => {
    if (user && user.role !== 'ADMIN') {
      navigate('/'); // Redirect to homepage or another page if user is not an admin
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchProduct = async () => {
      const productToEdit = products.find((prod) => prod.id === parseInt(id));
      if (productToEdit) {
        setProduct(productToEdit);
      } else {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          setError('Product not found');
        }
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, image } = product;

    if (!name || !price || !image) {
      setError('Product name, price, and image are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add token here
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update product');
      }

      const updatedProduct = await response.json();

      // Directly update the product in the context without reloading
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === parseInt(id) ? updatedProduct : prod
        )
      );
      navigate('/admin');  // Redirect to admin panel after updating
    } catch (error) {
      console.error('Error updating product:', error);
      setError(error.message || 'An error occurred while updating the product');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Product Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
