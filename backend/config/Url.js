

const APIURL = {
    FRONTEND_API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : "https://quickblog.netlify.app",
    MONGODBURL: process.env.NODE_ENV === 'development' ? process.env.MONGODB_URI : process.env.DEPLOYED_MONGODB_URI

}

module.exports = APIURL