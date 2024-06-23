const express = require('express');
const mongoose = require('mongoose');
const OrderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const userRoutes = require('./routes/user.routes');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://0.0.0.0/ecommerce').then(() => {
  console.log('MongoDB connected');
}).catch(err => console.error('MongoDB connection error:', err));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders',OrderRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
