import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { token } = useContext(AuthContext);  // Get token from AuthContext
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add token here
        },
        body: JSON.stringify(newProduct),
      });
      const addedProduct = await response.json();
      setProducts((prevProducts) => [...prevProducts, addedProduct]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,  // Add token here
        },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Add token here
        },
        body: JSON.stringify(updatedProduct),
      });
      const updated = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updated : product
        )
      );
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, deleteProduct, updateProduct,setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
