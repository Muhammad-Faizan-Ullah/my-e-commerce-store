import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Login.css';

const Login = ({ onLogin }) => { // Changed from handleLogin to onLogin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password
      });
      if (response && response.data && response.data.token) {
        onLogin(response.data.token); // Changed handleLogin to onLogin
        toast.success('Login successful.');
        navigate('/');
      } else {
        console.error('Login error:', 'Invalid response');
        toast.error('Login failed. Invalid response');
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data.message : error.message);
      if (error.response && error.response.status === 401) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error(error.response ? error.response.data.message : 'Login failed. Please try again later.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
