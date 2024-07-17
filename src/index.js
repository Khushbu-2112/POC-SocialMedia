const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const computeScores = require('./jobs/computeScore'); // Import the job scheduler

const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27018/instagram-poc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  computeScores(); // Initialize the job scheduler
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
