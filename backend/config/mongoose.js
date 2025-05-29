const mongoose = require('mongoose');
const config = require('../config/Url')

mongoose.connect(config.MONGODBURL).then(() => {
    console.log("MongoDB connected");
})