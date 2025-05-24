
const express = require('express');
const app = express();
require('dotenv').config();
const userRouter = require('./routes/userRouter')
require('./config/mongoose')
require('./config/passport')
var cookieParser = require('cookie-parser')
require('./Strategy/LocalStrategy')
const cors = require('cors');
const blogsRouter = require('./routes/blogsRouter');


const allowedOrigins = [
    "http://localhost:5173",
    "https://quickblog.netlify.app"
];
// CORS configuration
// Allow requests from the specified origins
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));



// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', userRouter)
app.use('/blogs', blogsRouter)



// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});