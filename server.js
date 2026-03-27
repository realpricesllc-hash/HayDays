const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/haydays', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (token) {
    jwt.verify(token, 'your_secret_key', (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// API Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contractors', require('./routes/contractors'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/payments', require('./routes/payments'));

// WebSocket Messaging
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    // Handle message
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
