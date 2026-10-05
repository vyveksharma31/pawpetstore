const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawpetstore';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // Fail fast if local MongoDB daemon is not running
    });
    
    isConnected = true;
    console.log(` MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Notice: Local MongoDB service not detected on ${uri}`);
    console.log(`ℹ️ Falling back to smart In-Memory & Seed Data Store for seamless local operation.`);
    console.log(`💡 To connect to live MongoDB: start MongoDB locally or set MONGODB_URI in backend/.env (e.g. MongoDB Atlas).`);
    isConnected = false;
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
