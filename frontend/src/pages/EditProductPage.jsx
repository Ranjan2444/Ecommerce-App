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

//    // Handle redirection if the user is not an admin
//     useEffect(() => {
//       // Wait until user is set, then check role
//       if (!user) {
//           navigate("/login")
//           return;
//       }
  
//       if (!user || user.role !== "ADMIN") {
//           navigate("/");  // Redirect to home if not an admin
//       }
//   }, [user, navigate]);

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
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-3xl font-semibold text-gray-800 mb-6">Edit Product</h1>
  
  {error && <div className="text-red-500 mb-4">{error}</div>}

  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Product Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={product.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Product Price */}
    <div>
      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">Product Price</label>
      <input
        type="number"
        id="price"
        name="price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Product Image URL */}
    <div>
      <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">Product Image URL</label>
      <input
        type="text"
        id="image"
        name="image"
        value={product.image}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      >
        Update Product
      </button>
    </div>
  </form>
</div>

  );
};

export default EditProductPage;
