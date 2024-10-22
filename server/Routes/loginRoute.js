const express=require("express")
const route=express.Router()
const User = require("../Models/userModel");
const bcrypt = require("bcrypt"); // To compare hashed passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens

// Login Controller
route.post("/",async (req, res) => { 
    try {
        const { username, password } = req.body;

        // Check if both username and password are provided
        if (!username || !password) {
            return res.status(400).json({ msg: "Please provide both username and password", status: false });
        }

        // Find user by username
        const user = await User.findOne({ username });
        console.log(user,'user')

        // If user doesn't exist
        if (!user) {
            return res.json({ msg: "User not found", status: false });
        }

        // Compare the password with the hashed password in DB
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.json({ msg: "Invalid password", status: false });
        }

        // Generate a JWT token if authentication is successful
        const token = jwt.sign({ id: user._id, username: user.username,email:user.email,userAvatarImage:user.userAvatarImage }, process.env.JWT_SECRET, {
            expiresIn: "1h", // Token expiration
        });
        

        // Return the token and user data (without the password)
        return res.status(200).json({
            msg: "Login successful",
            status: true,
            token,
            user: {
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.json({ msg: "Server error. Please try again later.", status: false });
    }
});

module.exports = route ;
