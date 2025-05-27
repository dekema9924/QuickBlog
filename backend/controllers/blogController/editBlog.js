const blogdb = require('../../models/blogsModel');

const editBlog = async (req, res) => {
    const { id } = req.params;
    const { content, coverImage } = req.body;
    const plainText = content.replace(/<[^>]*>/g, '').trim();

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
                title: plainText.slice(0, 40),
                coverImage,
                content,
                updatedAt: Date.now()
            }
        );
        console.log(updatedBlog.coverImage)


        return res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Edit blog error:', error);
        return res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = editBlog;
