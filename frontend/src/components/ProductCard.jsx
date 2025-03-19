
import React, { useContext,useEffect } from "react";
import { Edit, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';


const ProductCard = ({products}) => {
    const navigate = useNavigate();
    const user = useContext(AuthContext);

    const handleTitleClick = (id) => {
      navigate(`/product/${id}`);
    }
    const handleEditClick = (id) => {
      navigate(`/edit-product/${id}`);
    }

    return (
      <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative h-96 rounded-lg shadow-lg hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product Image as the Card Background */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
               
              {/* Product Details Overlay with Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 flex flex-col justify-end p-4">
                <h2 className="text-xl font-bold text-white truncate cursor-pointer" 
                onClick={() => handleTitleClick(product.id)}>{product.name}</h2>
                <p className="text-lg font-semibold text-white">${product.price.toFixed(2)}</p>
                {user?.user?.role === "ADMIN" && (
                <button
                  className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer"
                  onClick={() => handleEditClick(product.id)} 
                >
                  <Edit className="w-5 h-5 text-gray-700"/>
                </button>
              )}
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
    )
}

export default ProductCard;
