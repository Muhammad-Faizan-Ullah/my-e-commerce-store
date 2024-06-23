import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import ProductList from "./components/ProductList";
import ShoppingCart from "./components/ShoppingCart";
import Order from "./components/Order";
import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import OurStory from "./components/OurStory";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    window.location.href = "/products";  // Redirect to products page after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    delete axios.defaults.headers.common['Authorization'];
  };

  const addToCart = (product) => {
    const existingCart = cartItems.find((item) => item.name === product.name);
    if (existingCart) {
      const updatedCart = cartItems.map((item) => item.name === product.name ? {
        ...item, quantity: item.quantity + 1
      } : item);
      setCartItems(updatedCart);
    } else {
      setCartItems((prevCart) => [
        ...prevCart, { ...product, quantity: 1, productId: product._id }
      ]);
    }
  };

  const removeFromCart = (product) => {
    const updatedCart = cartItems.filter((item) => item.name !== product.name);
    setCartItems(updatedCart);
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
  };

  const handleSubmitOrder = async (orderData) => {
    try {
      const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const response = await axios.post("http://localhost:5000/api/orders", { ...orderData, totalPrice });
      if (response.status === 201) {
        toast.success("Order placed successfully.");
        setCartItems([]);
      } else {
        console.error("Error placing order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      if (error.message === "Failed to fetch") {
        toast.error("Failed to connect to the server. Please try again later.");
      } else if (error.response && error.response.status === 422) {
        console.error("Invalid data:", error.response.data);
        toast.error("Invalid data. Please check your input and try again.");
      } else {
        toast.error("Failed to place order. Please try again later.");
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navigation onSearch={handleSearch} cartItems={cartItems} onLogout={handleLogout} />
      <div>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={token ? <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} updateCart={updateCart} /> : <Navigate to="/login" />} />
          <Route path="/order" element={token ? <Order cartItems={cartItems} onSubmitOrder={handleSubmitOrder} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/products"
            element={
              <ProductList
                addToCart={addToCart}
                searchQuery={searchQuery}
              />
            }
          />
          <Route path="/ourStory" element={<OurStory />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
