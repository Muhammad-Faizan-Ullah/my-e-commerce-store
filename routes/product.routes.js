const express = require('express');
const router = express.Router();
const Product = require('../model/product.model');
router.get('/', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    // If an error occurs, send an error response with the error message
    res.status(500).json({ message: error.message });
  }
});
// POST a new product
router.post('/', async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      image,
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
