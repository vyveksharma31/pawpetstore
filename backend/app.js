const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { getDBStatus } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const breedRoutes = require('./routes/breedRoutes');
const orderRoutes = require('./routes/orderRoutes');
const clinicRoutes = require('./routes/clinicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Request Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health Check Endpoint (Phase 1 Requirement)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'PawPetStore API is healthy and operational.',
    dbConnected: getDBStatus(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/breeds', breedRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/clinic', clinicRoutes);
app.use('/api/admin', adminRoutes);

// Catch 404 for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: `API endpoint '${req.originalUrl}' does not exist on this server.`,
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

module.exports = app;
