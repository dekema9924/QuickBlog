const blogdb = require('../../models/blogsModel')

const deleteBlog = async (req, res) => {
    const { id } = req.params
    let blogExist = await blogdb.findById(id)
    if (!blogExist) return res.status(400).json({ message: 'invalid blog id' })
    if (blogExist.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'You are not the author of this blog' });
    }
    blogExist = await blogdb.findByIdAndDelete(id).then((result) => {
        if (!result) return res.status(400).json({ message: 'blog does not exist' })
        if (result) return res.status(200).json({ message: 'blog deleted' })
    })

}

module.exports = deleteBlog