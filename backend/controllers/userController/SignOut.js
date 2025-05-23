
const SignOut = (req, res) => {

    // Clear the JWT cookie
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        maxAge: 0
    });

    res.status(200).json({ message: 'Logged out successfully' });

}

module.exports = SignOut;