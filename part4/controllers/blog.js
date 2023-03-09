const Blog = require('../models/blog');
require('dotenv').config();

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const postBlog = async (request, response) => {
  console.log(request.body);
  try {
    const blog = await Blog.create(request.body);
    response.status(201).json(blog);
  } catch (error) {
    response.status(400).json(error);
  }
};

module.exports = {
  getBlogs,
  postBlog,
};
