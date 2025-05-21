
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel')
const passport = require("passport");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await User.findOne({ googleId: profile.id });

            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    profilePicture: profile.photos[0].value,
                });

            }

            cb(null, user);
        } catch (err) {
            cb(err, null);
        }
    }
));