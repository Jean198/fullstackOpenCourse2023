const blogRouter = require('express').Router();
const blogController = require('../controllers/blog');

blogRouter.get('', blogController.getBlogs);
blogRouter.post('/postblog', blogController.postBlog);
blogRouter.delete('/:id', blogController.deleteBlog);
blogRouter.patch('/:id', blogController.updateBlog);

module.exports = blogRouter;
