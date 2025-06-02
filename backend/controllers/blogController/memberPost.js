const blogDb = require('../../models/blogsModel')

const memberPost = async (req, res) => {
    let membersBlogs = await blogDb.find({})

    //created empty array to store members blog
    let blogs = []

    //mapped through blogs and got all blogs with role = 'admin'
    isRoleValid = membersBlogs.map((valid) => {
        if (valid.author.role === 'admin') {
            blogs.push(valid)
        }
    })

    //check if blogs is not empty
    if (blogs.length > 0) {
        return res.status(200).json({ blogs: blogs })
    }
    return res.status(400).json({ message: 'members blogs is empty' })

}

module.exports = memberPost