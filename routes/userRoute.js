const express = require('express');
const router = express.Router();
const User = require('../modals/user.modal.js');  // Ensure 'models' is correct
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKet = process.env.SECRETKEY;

router.post('/user', async (req, res) => {

    const salt = await bcrypt.genSalt(15);
    const securePassword = await bcrypt.hash(req.body.password,salt)
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            location: req.body.location,
            password: securePassword
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


router.post('/loginUser', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            data: null,
            error: "Email and password are required"
        });
    }

    try {
        const userData = await User.findOne({ email });

        if (!userData) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Invalid credentials, try again"
            });
        }
 
        const pwdCompare = await bcrypt.compare(req.body.password, userData.password)
        // Directly compare plaintext passwords (not secure, but matches your current setup)
        if (!pwdCompare) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Invalid credentials, try again"
            });
        }

        const  data = { userId: userData._id } 
        const authToken = jwt.sign(data,secretKet)

        // Authentication successful
        return res.json({
            success: true,
            authToken,
           // Example response, adjust as needed
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
});
module.exports = router;
