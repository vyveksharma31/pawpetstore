const bcrypt = require('bcryptjs');
const store = require('../utils/store');
const { generateToken } = require('../utils/jwt');

// @desc    Register a new customer
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please provide full name, email, and password.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const existingUser = await store.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        statusCode: 409,
        message: 'An account with this email address already exists. Please log in.',
      });
    }

    const newUser = await store.createUser({
      name,
      email,
      password,
      phone: phone || '',
      role: 'customer',
      addresses: [],
    });

    const token = generateToken(newUser.id, newUser.role);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Registration successful! Welcome to PawPetStore.',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phone: newUser.phone,
          addresses: newUser.addresses,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Please enter both email and password.',
      });
    }

    const user = await store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Invalid email or password. Please check your credentials.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: 'Invalid email or password. Please check your credentials.',
      });
    }

    const token = generateToken(user.id || user._id, user.role);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Login successful! Welcome back.',
      data: {
        user: {
          id: user.id || user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone || '',
          addresses: user.addresses || [],
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User profile retrieved',
    data: {
      user: req.user,
    },
  });
};

// @desc    Update user profile & address book
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    const { name, phone, addresses, wishlist } = req.body;
    const updated = await store.updateUser(userId, { name, phone, addresses, wishlist });
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Profile updated successfully',
      data: {
        user: updated,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
