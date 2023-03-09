require('dotenv').config();
const Blog = require('../models/blog');

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const postBlog = async (request, response) => {
  const blog = await new Blog(request.body);
  blog.save();
  response.status(201).json(blog);
};

module.exports = {
  getBlogs,
  postBlog,
};
