const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        sparse: true, // allows multiple nulls
    },
    authProvider: { type: String, required: true, enum: ['local', 'google'] },

    username: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: 'https://plus.unsplash.com/premium_photo-1741902728732-9abc944e318c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMHBpY3R8ZW58MHx8MHx8fDA%3D'
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
        sparse: true,
    },

    password: {
        type: String,
        minlength: 6,
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: { type: String, enum: ['standard', 'member', 'admin'], default: 'standard' },


}, { timestamps: true });

userSchema.index({ email: 1, authProvider: 1 }, { unique: true });
module.exports = mongoose.model('User', userSchema);