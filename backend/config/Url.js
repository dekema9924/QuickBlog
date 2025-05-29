
const APIURL = {
    MONGODBURL: process.env.NODE_ENV === 'development' ? process.env.MONGODB_URI : process.env.DEPLOYED_MONGODB_URI

}



module.exports = APIURL