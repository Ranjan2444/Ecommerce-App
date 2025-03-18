import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => {
                console.log(response.data); 
                setProducts(response.data.products); 
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);
    

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Product List</h1>
            <div className="grid grid-cols-3 gap-4 mt-4">
                {products.map((product) => (
                    <div key={product.id} className="p-4 border rounded-lg shadow">
                         <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
                        <h2 className="text-xl font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
