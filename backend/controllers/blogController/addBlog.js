const Blogdb = require('../../models/blogsModel');
const Userdb = require('../../models/userModel')

const addBlogs = async (req, res) => {
    try {
        const { title, tag, content } = req.body;

        if (!title || !tag || !content) {
            return res.status(400).json({ message: 'Title, tag, and content are required' });
        }

        //get author
        await Userdb.findById(req.user.id).then(async (result) => {
            const newBlog = new Blogdb({
                title,
                tag,
                content,
                user: req.user.id,
                author: {
                    username: result.username,
                    profilePicture: result.profilePicture

                },
            });

            console.log(newBlog)

            const savedBlog = await newBlog.save();

            return res.status(201).json(savedBlog);
        })




    } catch (error) {
        console.error('Error adding blog:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = addBlogs
