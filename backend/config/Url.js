
const APIURL = {
    FRONTEND_API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : "https://quickbl0gs.netlify.app",
    MONGODBURL: process.env.NODE_ENV === 'development' ? process.env.MONGODB_URI : process.env.DEPLOYED_MONGODB_URI

}

console.log({ urlconfig: APIURL.FRONTEND_API_URL })
module.exports = APIURL