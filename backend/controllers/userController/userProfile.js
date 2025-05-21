const User = require("../../models/userModel")

const userProfile = async (req, res) => {
    await User.findById(req.user.id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            res.status(200).json({ userStatus: user })
        })
        .catch((err) => {
            res.status(500).json({ message: "Internal server error" })
        })

}

module.exports = userProfile;