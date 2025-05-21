const User = require("../../models/userModel")
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" })
    }
    //check if user already exists
    const userExists = await User.find({ email: email })
    if (userExists.length > 0) {
        return res.status(400).json({ message: "User already exists" })
    }
    //create user
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            return res.status(500).json({ message: "Internal server error" })
        }
        const user = new User({
            email: email,
            password: hash
        })
        await user.save()
            .then(() => {
                res.status(201).json({ message: "User created successfully" })
            })
            .catch((err) => {
                res.status(500).json({ message: "Internal server error" })
            })
    })

}


module.exports = createUser;