
const express = require('express');
const app = express();
require('dotenv').config();
const userRouter = require('./routes/userRouter')
require('./config/mongoose')
require('./config/passport')
var cookieParser = require('cookie-parser')
require('./Strategy/LocalStrategy')



// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', userRouter)



// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});