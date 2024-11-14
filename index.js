// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // Parses incoming requests with JSON payloads

// MongoDB connection
const dbUri = process.env.MONGO_URI || 'mongodb://localhost:27017/houseRentApp'; // Mongo URI from .env file
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Routes (You will add more routes in different files later)
app.get('/', (req, res) => {
  res.send('Welcome to HouseRent API!');
});

// Example User and House routes
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);

// Port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
