const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userDetails: {
    type: {
      name: { type: String, required: true },
      address: { type: String, required: true },
     
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    required: true,
  },
  cartItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    
    price: { type: Number, required: true },
    name: { type: String, required: true },
  }],
  totalPrice: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
