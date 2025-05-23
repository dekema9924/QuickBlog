const cloudinary = require('../../utils/cloudinary')
const fs = require('fs')
const Userdb = require('../../models/userModel')


const Upload = async (req, res) => {
    const filepath = req.file.path //img file


    // Upload an image to cloudinary
    await cloudinary.uploader
        .upload(
            filepath, {
        }).then(async (result) => {
            //save in db
            await Userdb.findById(req.user.id).then(async (user) => {
                if (user) {
                    user.profilePicture = result.secure_url
                    await user.save(); // Save the changes to the database

                }
            })

            //delete file stored in uploads after uploading in cloudinary
            fs.unlink(filepath, (err) => {
                if (err) {
                    console.error('Failed to delete local file:', err);
                } else {
                    console.log('Local file deleted:', filepath);
                }
            });
            if (result.secure_url) return res.status(200).json({ message: result.secure_url })
        })
        .catch((error) => {
            console.log(error);
        });

}


module.exports = Upload