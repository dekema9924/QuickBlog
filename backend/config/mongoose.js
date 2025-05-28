const mongoose = require('mongoose');
const URL = require('../config/Url')

mongoose.connect(URL.MONGODBURL).then(() => {
    console.log("MongoDB connected");
})