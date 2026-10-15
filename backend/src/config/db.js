const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bodycraft_tn';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[BODYCRAFT TN] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[BODYCRAFT TN] Warning: MongoDB Connection failed (${error.message}).`);
    console.warn(`[BODYCRAFT TN] Ensure MongoDB is running locally at ${mongoURI} or check Atlas connection string.`);
  }
};

module.exports = connectDB;
