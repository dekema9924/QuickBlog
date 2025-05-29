
const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const verifyToken = require('../middleware/verifyToken');
const createToken = require('../utils/createToken')
const userProfile = require('../controllers/userController/userProfile')
const createUser = require('../controllers/userController/createUser');
const signIn = require('../controllers/userController/signIn');
const SignOut = require('../controllers/userController/SignOut');
const Upload = require('../controllers/userController/Upload');
const URL = require('../config/Url')
const changePswrd = require('../controllers/userController/ChangePswrd');

// multer
const storage = require('../utils/multer')
const multer = require('multer');
const upload = multer({ storage: storage })




//user router
userRouter.get('/profile', verifyToken, userProfile);
userRouter.post('/signup', createUser);
userRouter.post('/signin', signIn)
userRouter.post('/signout', verifyToken, SignOut)
userRouter.post('/upload', verifyToken, upload.single('avatar'), Upload)
userRouter.post('/changepassword', verifyToken, changePswrd)



//google authentication
userRouter.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/google/callback',
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        //ctreate a token and send it to the client
        const token = createToken(req.user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day

        })
        res.redirect(URL.FRONTEND_API_URL);
    });





module.exports = userRouter;