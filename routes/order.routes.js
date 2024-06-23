const express = require('express');
const router = express.Router();
const Order = require('../model/order.model');

router.post('/', async (req, res) => {
  try {
    const { userDetails, cartItems, totalPrice } = req.body;

    console.log("Received data:", req.body); // Log the received data

    // Ensure totalPrice is a valid number
    const parsedTotalPrice = parseFloat(totalPrice);
    if (isNaN(parsedTotalPrice)) {
      console.error("Invalid totalPrice format:", totalPrice);
      return res.status(400).json({ message: "Invalid totalPrice format" });
    }

    if (!userDetails || !cartItems || !parsedTotalPrice) {
      console.error("Missing required fields:", { userDetails, cartItems, parsedTotalPrice });
      return res.status(400).json({ message: "Missing Required Field" });
    }

    const invalidCart = cartItems.some(item => !item.productId);
    if (invalidCart) {
      console.error("Invalid cart items:", cartItems);
      return res.status(400).json({ message: "Invalid Cart" });
    }

    const order = new Order({
      userDetails,
      totalPrice: parsedTotalPrice,
      cartItems
    });

    await order.save();
    console.log('Order placed successfully');
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
