// routes/user.routes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body; // Changed () to {}
    const existingUser = await User.findOne({ email }); // Changed find to findOne
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); // Changed exist to exists
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword }); // Changed password to hashedPassword
    await newUser.save();
    res.status(200).json({ message: 'User registered Successfully' });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Changed () to {}
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) { // Fixed the compare function
      return res.status(401).json({ message: "Invalid Credentials" }); // Changed Credential to Credentials
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
