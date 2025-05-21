const passport = require('passport');
const createToken = require('../../utils/createToken')

const signIn = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({ message: info?.message || 'Login failed' });
        }

        // If the user is found, create a token
        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
            maxAge: 24 * 60 * 60 * 1000 // 1 day

        })

        return res.status(200).json({
            message: 'Login successful',
        });

    })(req, res, next);
}

module.exports = signIn