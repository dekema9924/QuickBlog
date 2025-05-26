const blogdb = require('../../models/blogsModel');

const editBlog = async (req, res) => {
    const { id } = req.params;
    const { content, coverImage } = req.body;

    try {
        const blogExist = await blogdb.findById(id);
        if (!blogExist) {
            return res.status(400).json({ message: 'Invalid blog ID' });
        }

        if (blogExist.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not the author of this blog' });
        }

        const updatedBlog = await blogdb.findByIdAndUpdate(
            id,
            {
                title: content.slice(0.12),
                coverImage,
                content,
                updatedAt: Date.now()
            },
            { new: true } // Return the updated document
        );
        console.log(updatedBlog.coverImage)


        return res.status(200).json({ message: 'Blog updated successfully', updatedBlog });
    } catch (error) {
        console.error('Edit blog error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = editBlog;
