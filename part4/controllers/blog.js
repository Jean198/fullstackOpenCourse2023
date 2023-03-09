const Blog = require('../models/blog');
require('dotenv').config();

const getBlogs = async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
};

const postBlog = async (request, response) => {
  try {
    const blog = new Blog(request.body);
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    response.status(400).json(error);
  }
};

const deleteBlog = async (request, response) => {
  try {
    const { id } = request.params;
    const blogToDelete = await Blog.findByIdAndDelete(id);

    if (!blogToDelete) {
      return response
        .status(404)
        .json(`Can't delete blog. Blog with id ${id} can't be found!`);
    }
    response.status(200).json(`Blog deleted`);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getBlogs,
  postBlog,
  deleteBlog,
};
