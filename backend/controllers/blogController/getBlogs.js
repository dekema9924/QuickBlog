const Blogdb = require('../../models/blogsModel')

const getBlogs = async (req, res) => {

    //get only blogs excepet ones made by admin
    await Blogdb.find({ 'author.role': 'member' }).then((result) => {
        if (!result) return res.status(400).json({ message: 'no blogs found' })
        return res.status(200).json({ blogs: result })
    })
}


module.exports = getBlogs;