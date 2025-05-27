const Blogdb = require('../../models/blogsModel');
const Userdb = require('../../models/userModel')

const addBlogs = async (req, res) => {
    const { content, coverImage } = req.body



    try {
        if (content.length < 0) {
            return res.status(400).json({ message: "content cannot be empty!" })
        }

        //get author
        await Userdb.findById(req.user.id).then(async (result) => {
            const newBlog = new Blogdb({
                title: content.slice(0, 40),
                coverImage,
                content,
                user: req.user.id,
                author: {
                    username: result.username,
                    profilePicture: result.profilePicture

                },
            });

            const savedBlog = await newBlog.save();

            return res.status(201).json(savedBlog);
        })

    }
    catch (error) {
        console.error('Error adding blog:', error);
        return res.status(500).json({ message: 'Server error' });

    }


};

module.exports = addBlogs
