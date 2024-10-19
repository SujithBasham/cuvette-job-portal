const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
require('dotenv').config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/jobs', jobRoutes);   // Job-related routes

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
