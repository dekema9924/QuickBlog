
const express = require('express')
const addBlogs = require('../controllers/blogController/addBlog')
const blogsRouter = express.Router()
const verifyToken = require('../middleware/verifyToken')
const getBlogs = require('../controllers/blogController/getBlogs')
const blogDetails = require('../controllers/blogController/blogDetails')
const deleteBlog = require('../controllers/blogController/deleteBlog')
const editBlog = require('../controllers/blogController/editBlog')
const isAdmin = require('../middleware/IsAdmin')
const memberPost = require('../controllers/blogController/memberPost')



blogsRouter.post('/addblog', verifyToken, addBlogs)
blogsRouter.get('/getblogs', getBlogs)
blogsRouter.get('/membersblogs', memberPost)
blogsRouter.get('/:id', blogDetails)
blogsRouter.delete('/:id', verifyToken, deleteBlog)
blogsRouter.put('/:id', verifyToken, editBlog)






module.exports = blogsRouter;