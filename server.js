const express = require('express');
const app = express();
const port = 8080;

// Middleware to parse JSON data
app.use(express.json());

// Array to store user data
const users = [];

// Endpoint to handle user registration
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;

  // Log the received email and password
  console.log('Registration request:', email, password);

  // Validate request data
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check if user with the same email already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  // Create a new user object
  const user = { email, password };

  // Store the user in the array
  users.push(user);

  // Return success message
  res.json({ message: 'User registered successfully' });
});

// Endpoint to handle user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Log the received email and password
  console.log('Login request:', email, password);

  // Validate request data
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const user = users.find(user => user.email === email);

  // Check if user exists and password matches
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Return success message or user data
  res.json({ message: 'User logged in successfully', user });
});

// Serve static files for React app
app.use(express.static('build'));

// Route all other requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});