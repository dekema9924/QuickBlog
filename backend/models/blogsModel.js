const mongoose = require('mongoose');

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
        type: Object,  // store JSON from tiptap here
        required: true,
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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
