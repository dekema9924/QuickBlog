const cloudinary = require('../../utils/cloudinary')
const Userdb = require('../../models/userModel')
const Blogdb = require('../../models/blogsModel')


const Upload = async (req, res) => {
    const filepath = req.file.path //img file

    console.log({ filepath: filepath })


    // Upload an image to cloudinary
    await cloudinary.uploader.upload(filepath).then(async (result) => {
        //save in db
        const user = await Userdb.findById(req.user.id)

        user.profilePicture = result.secure_url;
        await user.save(); // Save the changes to the database

        await Blogdb.updateMany(
            { user: req.user.id },
            { $set: { "author.profilePicture": result.secure_url } }
        )

        if (result.secure_url) return res.status(200).json({ message: result.secure_url })
    })
        .catch((error) => {
            console.log(error);
        });

}


module.exports = Upload