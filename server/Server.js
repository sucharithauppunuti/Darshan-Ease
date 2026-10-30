const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true); // Permissive in local dev
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
  })
);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'DarshanEase API',
    timestamp: new Date().toISOString()
  });
});

// Mount Core Temple Darshan Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/temples', require('./routes/templeRoutes'));
app.use('/api/darshan-types', require('./routes/darshanTypeRoutes'));
app.use('/api/slots', require('./routes/slotRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/enquiries', require('./routes/enquiryRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 404 Route handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route not found: ${req.originalUrl}`
  });
});

// Centralized error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

const server = app.listen(PORT, () => {
  console.log(`🕉️ DarshanEase Server running on port ${PORT}`);
  console.log(`🌐 Base API URL: http://localhost:${PORT}/api`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Error: Port ${PORT} is already in use by another process.`);
    console.error(`💡 To free port ${PORT} on Windows PowerShell, run:`);
    console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
});
