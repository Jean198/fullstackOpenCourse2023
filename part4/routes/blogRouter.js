const blogRouter = require('express').Router();
const blogController = require('../controllers/blog');

blogRouter.get('', blogController.getBlogs);
blogRouter.post('/postblog', blogController.postBlog);

module.exports = blogRouter;
