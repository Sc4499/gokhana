const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/gokhana"

const mongoDb = async () => {
    try {
      await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
    }
  };
  
  module.exports = mongoDb;

