const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true, // allows multiple nulls
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true,
    },
    username: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
        unique: true,
        sparse: true,
    },

    password: {
        type: String,
        minlength: 6,
    },
    role: { type: String, enum: ['standard', 'member', 'admin'], default: 'standard' },


}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);