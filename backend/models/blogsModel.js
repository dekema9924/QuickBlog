const mongoose = require('mongoose');
const isAdmin = require('../middleware/IsAdmin');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: true,
        default: 'standard',  // optional default
    },
    content: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String
    },
    author: {
        username: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "", // optional default
        },
        isAdmin: {
            type: Boolean
        },
        role: {
            type: String,
            enum: ['standard', 'member', 'admin']
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
