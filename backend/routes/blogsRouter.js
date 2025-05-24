
const express = require('express')
const addBlogs = require('../controllers/blogController/addBlog')
const blogsRouter = express.Router()
const verifyToken = require('../middleware/verifyToken')
const getBlogs = require('../controllers/blogController/getBlogs')


blogsRouter.use(verifyToken)

blogsRouter.post('/addblog', addBlogs)
blogsRouter.get('/getblogs', getBlogs)





module.exports = blogsRouter;