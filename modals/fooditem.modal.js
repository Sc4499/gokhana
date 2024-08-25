const mongoose = require('mongoose');

// Define the schema
const foodItemSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  image :{
    type :String,
    required : true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String], // Array of strings
    required: true
  },
  category: {
    type: String, // Reference to the User model
    required: true
  },
  availability: {
    type: Boolean,
    required: true
  },
  quantity: {
    type: [String],
    required: true
  }
});

// Create a model
const FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;
