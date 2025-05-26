const User = require("../../models/userModel")
const bcrypt = require('bcryptjs')

const createUser = async (req, res) => {
    const { email, password, adminCode } = req.body;
    console.log(email, password, adminCode);

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Validate admin code if provided
    if (adminCode && adminCode !== process.env.ADMIN_CODE) {
        return res.status(400).json({ message: "Invalid admin code" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const role = adminCode === process.env.ADMIN_CODE ? "admin" : "standard";
    const isAdmin = role === "admin" ? true : false;
    console.log("Role:", role, "Is Admin:", isAdmin);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            username: email.split('@')[0], // Default username from email
            role,
            isAdmin
        });

        await user.save();
        console.log("User created:", user.username);
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = createUser;
