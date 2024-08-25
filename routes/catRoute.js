const express = require('express');
const router = express.Router();
const User = require('../modals/category.modal.js');  // Ensure 'models' is correct

router.post('/category', async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
          });

        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
