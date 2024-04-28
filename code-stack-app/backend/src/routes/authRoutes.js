const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Mock user data (replace with actual authentication logic)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// Route to authenticate user and generate JWT token
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock authentication logic (replace with actual authentication logic)
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
});

// Route to access protected resource
router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected resource accessed successfully' });
});

module.exports = router;
