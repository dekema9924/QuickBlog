const User = require('../models/userModel')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
},
    async function (email, password, done) {

        // Check if the user exists
        const user = await User.findOne({ email: email });


        if (!user) return done(null, false, { message: 'User not found' });
        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });
        // If everything is ok, return the user
        return done(null, user);
    }
));

