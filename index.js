require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const cors = require('cors');
// Import and connect to MongoDB
const mongoDb = require('./db.js');
const FoodItem = require('./modals/fooditem.modal.js');
mongoDb().catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process with failure code
});

app.use(cors());

app.use(express.json());

// Define routes
app.get("/", (_, res) => {
    res.send("Hello, world!");
});

app.get('/api/fooditem', async (req, res) => {
    try {
      const users = await FoodItem.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
app.use('/api', require("./routes/userRoute.js"));
app.use('/api', require("./routes/catRoute.js"));
app.use('/api', require("./routes/fooditemRoute.js"));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
