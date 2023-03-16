const User = require('../models/user');
const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

const testing = asyncHandler(async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = {
  testing,
};
