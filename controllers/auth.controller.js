const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user.model');

const login = async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log(`User not found for username: ${username}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful');
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
    return res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { login };