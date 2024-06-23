import React, { useState, useEffect } from "react";
import "./ProductList.css";
import Footer from "./Footer";
import Header from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductList = ({ addToCart, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data = await response.json();
        setProducts(data);
        localStorage.setItem('products', JSON.stringify(data));
      } catch(error) {
        console.log('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); 

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("products"));
    if(storedProduct) {
      setProducts(storedProduct);
    }
  }, []); 

  const filteredProducts = products.filter((product) => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMouseEnter = (productId) => {
    setHoveredProductId(productId);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart.`);
  };

  return (
    <>
      <div className="container">
        <div className="product-list-container">
          <div className="banner text-center mt-3">
            <h1 className="display-4 font-weight-bold fancy-text mb-3">
              Welcome to our Store!
            </h1>
            <p className="lead custom-text-color">
              Discover a wide range of high-quality products.
            </p>
          </div>
          <div className="mb-4">
            <Header />
          </div>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="col"
              >
                <div className="product-card"
                  onMouseEnter={() => handleMouseEnter(product._id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">
                      {product.description}
                    </p>
                    <p className="product-price">${product.price}</p>
                    {hoveredProductId === product._id && (
                      <button
                        className="add-to-cart-button"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default ProductList;
