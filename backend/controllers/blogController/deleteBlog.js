const { response } = require('express')
const blogdb = require('../../models/blogsModel')
const Userdb = require('../../models/userModel')

const deleteBlog = async (req, res) => {
    const { id } = req.params

    const admins = await Userdb.find({ isAdmin: true });

    const blogExist = await blogdb.findById(id);
    if (!blogExist) {
        return res.status(400).json({ message: 'Blog does not exist' });
    }

    // Check if current user is the blog owner
    const isOwner = blogExist.user.toString() === req.user.id;

    // Check if current user is an admin
    const isAdmin = admins.some(admin => admin._id.toString() === req.user.id);


    if (!isOwner && !isAdmin) {
        return res.status(403).json({ message: 'You are not authorized to delete this blog' });
    }

    try {
        const result = await blogdb.findByIdAndDelete(id);
        if (!result) {
            return res.status(400).json({ message: 'Blog does not exist' });
        }
        return res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'An error occurred', error });
    }









}

module.exports = deleteBlog