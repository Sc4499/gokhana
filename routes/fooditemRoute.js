const express = require('express');
const router = express.Router();
const FoodItem = require('../modals/fooditem.modal.js');  // Ensure 'models' is correct

router.post('/fooditem', async (req, res) => {
    try {
        const newCategory = await FoodItem.create({
            name: req.body.name,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price,
            calories: req.body.calories,
            ingredients: req.body.ingredients,
            category: req.body.category,
            availability: req.body.availability,
            quantity: req.body.quantity
        });

        res.status(201).json({
            success: true,
            data: newCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
