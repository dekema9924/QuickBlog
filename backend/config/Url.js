const config = {
    MONGODBURL:
        process.env.NODE_ENV === 'development'
            ? process.env.MONGODB_URI
            : process.env.DEPLOYED_MONGODB_URI,

    FRONTEND_URL: process.env.DEVELOPMENT_URL || 'http://localhost:5173'


};



module.exports = config;
