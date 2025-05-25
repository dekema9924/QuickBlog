const blogdb = require('../../models/blogsModel');

const blogDetails = async (req, res) => {
    const { id } = req.params

    await blogdb.findById(id).then((result) => {
        if (!result) return res.status(400).json({ message: 'invalid blog id' })
        return res.status(200).json({ message: result })
    })

}

module.exports = blogDetails;