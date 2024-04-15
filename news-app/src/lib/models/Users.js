const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    firstName: String,
    lastName: String,
    emailAddress: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    userImage: String,
    readLater: [],
    refreshTokens: [],
    lastUpdated: { type: Date, default: Date.now }
});

// Check if the model exists before compiling it
const User = mongoose.models.users || mongoose.model('users', userSchema);

module.exports = User;
