const blogRouter = require('express').Router();
const blogController = require('../controllers/blog');
const protectRoute = require('../middlewares/authMiddleware');

blogRouter.get('', protectRoute, blogController.getBlogs);
blogRouter.post('/createblog', protectRoute, blogController.postBlog);
blogRouter.delete('/:id', protectRoute, blogController.deleteBlog);
blogRouter.put('/:id', blogController.updateBlog);

module.exports = blogRouter;
