
const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');




// multer
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/')

//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//     }
// })
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'quickblog_uploads',
        allowed_formats: ['jpg', 'png', 'jpeg'],

    },
});

const parser = multer({ storage: storage });



module.exports = parser