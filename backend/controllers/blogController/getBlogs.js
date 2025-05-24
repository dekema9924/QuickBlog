const Blogdb = require('../../models/blogsModel')

const getBlogs = async (req, res) => {
    await Blogdb.find({}).then((result) => {
        if (!result) return res.status(400).json({ message: 'no blogs found' })
        return res.status(200).json({ blogs: result })
    })
}


module.exports = getBlogs;