const axios = require('axios');
const bcrypt = require('bcrypt');

const apiKey = process.env.MONGO_API_KEY;
const endpointUrl = 'https://ap-south-1.aws.data.mongodb-api.com/app/application-0-kucgxyr/endpoint/usersdata';

// Create an Axios instance with base URL and headers
const axiosInstance = axios.create({
  baseURL: endpointUrl,
  headers: {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  },
});

// Register a new user
exports.registerUser = async (req, res) => {
  const { userName, email, password, role, profilePicture, bio } = req.body;

  try {
    // Check if the user already exists
    const existingUserResponse = await axiosInstance.get(`/?email=${email}`);
    if (existingUserResponse.data.length > 0) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user data
    const newUser = {
      userName,
      email,
      password: hashedPassword,
      role,
      profilePicture,
      bio,
      createdAt: new Date(),
    };

    // Send a POST request to MongoDB Atlas endpoint
    const response = await axiosInstance.post('/create', newUser);

    res.status(201).json({
      message: 'User registered successfully',
      user: response.data,
    });
  } catch (error) {
    console.error('Error in registerUser:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const userResponse = await axiosInstance.get(`/?email=${email}`);
    const user = userResponse.data[0];
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user details by ID
exports.getUserById = async (req, res) => {
  try {
    const userResponse = await axiosInstance.get(`/${req.params.id}`);
    const user = userResponse.data;
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { userName, profilePicture, bio } = req.body;

  try {
    const updatedUser = {
      userName,
      profilePicture,
      bio,
    };

    const response = await axiosInstance.patch(`/${req.params.id}`, updatedUser);

    if (!response.data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: response.data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID (admin role)
exports.deleteUser = async (req, res) => {
  try {
    const response = await axiosInstance.delete(`/${req.params.id}`);

    if (response.status !== 200) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
