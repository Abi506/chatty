const express = require("express");
const User = require("../Models/userModel");
const verifyToken = require("../Middlewares/auth");
const route = express.Router();

route.get("/", verifyToken, async (req, res) => {
    try {
        console.log(req.user, 'request');

        // Fetch all users without the password field
        const users = await User.find().select('-password'); // Use find to get all users
        console.log(users, 'users');

        // Check if there are any users found
        if (!users || users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }

        return res.json(users); // Send the array of user objects in response
    } catch (error) {
        res.status(500).json({ msg: error.message }); // Send 500 status for server error
    }
});

module.exports = route;
