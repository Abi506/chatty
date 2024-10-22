const express = require('express');
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const User = require("../Models/userModel");

// Create router instance
const router = express.Router();

// Setup multer for image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Directory where images will be stored (create this folder)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename the file with a timestamp
    }
});

// Filter for image files
const imageFilter = (req, file, cb) => {
    if (!file.mimetype.startsWith('image')) {
        cb(new Error("Only images are allowed"), false);
    } else {
        cb(null, true);
    }
};

// Multer upload middleware
const upload = multer({ storage, fileFilter: imageFilter });

// Register function
const register = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "Username already used", status: false });
        }

        const emailCheck = await User.findOne({ email });
        if (emailCheck) return res.json({ msg: "Email already used", status: false });

        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if an image was uploaded, else set default image path
        const profileImage = req.file ? `/uploads/${req.file.filename}` : "../images/avatar.jpg";

        // Create the user with the uploaded image or default avatar
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
            userAvatarImage: profileImage
        });

        // Remove the password before sending the response
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        return res.json({ status: true, user: userWithoutPassword });
    } catch (error) {
        res.json({ error_msg: error.message });
    }
};

// Route for user registration with image upload
router.post('/', upload.single('image'), register);

module.exports = router;
