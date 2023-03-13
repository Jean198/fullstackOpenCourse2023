const Blog = require('../models/blog');
const User = require('../models/user');
require('dotenv').config();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const getBlogs = asyncHandler(async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

const postBlog = asyncHandler(async (request, response) => {
  const body = request.body;
  const title = request.body.title;
  const user = await User.findById(body.userId);

  if (!user) {
    response.status(500);
    throw new Error('User Not allowed to create blog');
  }

  if (!title) {
    response.status(400);
    throw new Error('Blog title is required');
  }

  const blog = await Blog.create({
    title: body.title,
    author: body.author,
    likes: body.likes,
    user: user.id,
  });

  user.blogs = [...user.blogs, blog._id];
  await user.save();

  response.status(201).json(blog);
});

const deleteBlog = asyncHandler(async (request, response) => {
  const { id } = request.params;
  const blogToDelete = await Blog.findByIdAndDelete(id);
  if (!blogToDelete) {
    response.status(404);
    throw new Error('Blog  not found');
  }

  //Match blog with the user who created it
  if (blogToDelete.user.toString() !== request.body.userId) {
    response.status(401);
    throw new Error('User not authorized to delete this blog');
  }

  await product.remove();
  response.status(200).json({ message: 'Blog deleted successfully!' });
});

const updateBlog = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params;
    const { title, author, likes, url } = request.body;
    const updatedTask = {
      title,
      author,
      likes,
      url,
    };
    const taskToUpdate = await Blog.findByIdAndUpdate(
      { _id: id },
      updatedTask,
      {
        new: true,
      }
    );

    if (!taskToUpdate) {
      return response
        .status(404)
        .json(`Can't update blog. Blog with id ${id} can't be found!`);
    }
    response.status(200).json(taskToUpdate);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
});

module.exports = {
  getBlogs,
  postBlog,
  deleteBlog,
  updateBlog,
};
