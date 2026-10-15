require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const errorHandler = require('./src/middleware/errorHandler');

// Route Handlers
const authRoutes = require('./src/routes/authRoutes');
const workshopRoutes = require('./src/routes/workshopRoutes');
const quotationRoutes = require('./src/routes/quotationRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const reviewRoutes = require('./src/routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const PLATFORM_NAME = process.env.PLATFORM_NAME || 'BODYCRAFT TN — Bus & Lorry Body Building Platform';

// Connect Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ONLINE',
    platform: PLATFORM_NAME,
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    regionsSupported: ['Karur', 'Namakkal', 'Coimbatore', 'Chennai', 'Salem', 'Madurai'],
  });
});

// Mount API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/reviews', reviewRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  [BODYCRAFT TN] Backend Server Active on Port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Environment:  ${process.env.NODE_ENV || 'development'}`);
    console.log(`=======================================================`);
  });
}

module.exports = app;
