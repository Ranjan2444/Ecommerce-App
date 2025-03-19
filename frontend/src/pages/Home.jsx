import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { Card,Button } from "@material-tailwind/react";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(response => {
                // console.log(response.data); 
                setProducts(response.data.products); 
            })
            .catch(error => console.error("Error fetching products:", error));
    }, []);
    

    return (
        <div className="min-h-screen">
        <Navbar />
        <ProductCard products={products} />
        </div>
    );
};

export default Home;
