const Userdb = require('../../models/userModel')
const bcrypt = require('bcryptjs')
var validator = require('validator');


const changePswrd = async (req, res) => {
    let { new_password, confirm_password } = req.body

    //validate password
    const isnewPasswordValid = validator.isStrongPassword(new_password) && validator.isStrongPassword(confirm_password)

    if (!isnewPasswordValid) return res.status(400).json({ message: 'Choose a strong Password' })

    if (new_password !== confirm_password) return res.status(400).json({ message: 'passwords do not match' })

    const findUser = await Userdb.findOne({ _id: req.user.id, authProvider: 'local' })

    try {
        if (!findUser) return res.status(400).json({ message: 'Invalid User' })

        bcrypt.compare(new_password, findUser.password, async function (err, result) {
            if (result) return res.status(400).json({ message: 'password cannot be same as last password' })
            bcrypt.hash(new_password, 10, async function (err, hash) {
                if (err || !hash) {
                    return res.status(400).json({ message: 'Failed to change password' });
                }

                findUser.password = hash;

                try {
                    await findUser.save(); // Save the updated user to the database

                    //logUser out
                    res.clearCookie('token', {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
                        maxAge: 0
                    });
                    return res.status(200).json({ message: 'Password changed successfully' });
                } catch (saveError) {
                    return res.status(500).json({ message: 'Error saving new password', error: saveError });
                }


            });



        });



    }
    catch (error) {
        console.error
    }
}

module.exports = changePswrd