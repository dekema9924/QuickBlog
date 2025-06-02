
const express = require('express')
const addBookmark = require('../controllers/BookmarkController/addBookmark')
const getBookmarks = require('../controllers/BookmarkController/getBookmarks')
const bookmarkrouter = express.Router()
const verifyToken = require('../middleware/verifyToken')


bookmarkrouter.get('/', (req, res) => {
    res.send('bookmark route')
})

bookmarkrouter.post('/addbookmark', verifyToken, addBookmark)
bookmarkrouter.get('/getbookmarks', verifyToken, getBookmarks)




module.exports = bookmarkrouter