const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    userAvatarImage: {
        type: String, // Expecting a URL or file path from the frontend
        required: true // Avatar must be provided
    }
});

module.exports = mongoose.model("Users", userSchema);
