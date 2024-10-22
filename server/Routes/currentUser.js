const express = require("express");
const User = require("../Models/userModel");
const verifyToken = require("../Middlewares/auth");
const route = express.Router();

route.get("/", verifyToken, async (req, res) => {
    try {
        console.log(req.user, 'request');
        // Fetch the user without the password field
        const user = await User.findOne({ _id: req.user }).select('-password'); // Use findOne for a single object
        console.log(user, 'user');
        
        // Check if the user was found
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        return res.json(user); // Send the user object in response
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send 500 status for server error
    }
});

module.exports = route;
