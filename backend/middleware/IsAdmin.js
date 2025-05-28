const Userdb = require('../models/userModel')

const isAdmin = async (req, res, next) => {
    if (req.user) {
        await Userdb.findById(req.user.id).then((userRole) => {
            if (userRole.role !== 'admin') return res.status(400).json({ message: 'Access denied, admin only' })
            next()
        })
    }
}

module.exports = isAdmin;