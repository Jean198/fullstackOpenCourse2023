const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const protectRoute = asyncHandler(async (request, response, next) => {
  const token = request.cookies.token;
  if (!token) {
    response.status(401);
    throw new Error('Not authorised, please login!');
  }
  //Verify token
  const verified = jwt.verify(token, process.env.SECRET);

  //Get user id from token
  const user = await User.findById(verified.user.id).select('-passwordHash'); //Do not send back the passwordHash
  if (!user) {
    response.status(401);
    throw new Error('User not found!');
  }
  console.log(user);
  request.body.userId = user._id;

  next();
});

module.exports = protectRoute;
