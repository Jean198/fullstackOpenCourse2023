const Blog = require('../models/blog');

const getBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
};

const postBlog = (request, response) => {
  console.log(request.body);
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
};

module.exports = {
  getBlogs,
  postBlog,
};
