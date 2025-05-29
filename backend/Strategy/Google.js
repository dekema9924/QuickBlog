
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel')
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.NODE_ENV === 'development'
        ? "http://localhost:3000/auth/google/callback"
        : "https://quickblog-cyo4.onrender.com/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        let email = profile.emails?.[0]?.value;
        let IsVerified = profile.emails?.[0]?.verified;


        // Optional: block unverified emails
        // if(!isVerified) {
        //     return done(new Error("Email is not verified"), null);
        // }

        try {
            let user = await User.findOne({ email, authProvider: 'google' });
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    profilePicture: profile.photos[0].value,
                    role: 'member',
                    email: email,
                    isVerified: IsVerified,
                    authProvider: 'google',

                });


            }

            cb(null, user);
        } catch (err) {
            cb(err, null);
        }
    }
));