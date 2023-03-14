const User = require('../models/user');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookie = require('cookie');

// Generate token
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '1d' });
};

const createUser = asyncHandler(async (request, response) => {
  const { username, name, password } = request.body;

  //Validation
  if (!name || !username || !password) {
    response.status(400);
    throw new Error('Please fill in all required fields');
  }
  if (username.length < 3) {
    response.status(400);
    throw new Error('Username must be atleast to 3 characters');
  }
  if (password === undefined || password.length < 3) {
    response.status(400);
    throw new Error('Password must be atleast 3 characters long');
  }

  //Check if user already exists
  const userExist = await User.findOne({ username });
  if (userExist) {
    response.status(400);
    throw new Error('username has already been used');
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  //Create new user
  const user = await User.create({
    name,
    username,
    passwordHash,
  });

  response.status(201).json(user);
});

//---------------------------------------------------------------------------------

const getAllUsers = asyncHandler(async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    likes: 1,
  });
  response.json(users);
});

//-----------------------------------------------------------------------------------

const loginUser = asyncHandler(async (request, response) => {
  const { username, password } = request.body;

  //Validate request
  if (!username || !password) {
    response.status(400);
    throw new Error('Both username and password are required!');
  }

  //Check if the user exist
  const user = await User.findOne({ username });
  if (!user) {
    response.status(400);
    throw new Error('Incorrect username or Password');
  }

  //If user found, check if password is correct!
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

  if (user && passwordCorrect) {
    const userForToken = {
      username: user.username,
      id: user._id,
    };
    // Generate Token
    const token = generateToken(userForToken);

    //Send Http-only cookie
    response.cookie('token', token, {
      path: '/',
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
      //sameSite: 'none', // disabling this helped to get the cookie in the browser
      //secure: true,
    });

    response
      .status(200)
      .send({ token, username: user.username, name: user.name });
  } else {
    response.status(400);
    throw new Error('Incorrect username or Password');
  }
});

//Get login status
const loginStatus = asyncHandler(async (request, response) => {
  const token = request.cookies.token;
  if (!token) {
    return response.json(false);
  }

  const verified = jwt.verify(token, process.env.SECRET);
  if (verified) {
    return response.json(true);
  }
  return response.json(false);
});

const logoutUser = asyncHandler(async (request, response) => {
  response.cookie('token', '', {
    path: '/',
    httpOnly: true,
    expires: new Date(0),
    sameSite: 'none',
    secure: true,
  });

  response.status(200).json({ message: 'User logout succesfully!' });
});

module.exports = {
  createUser,
  getAllUsers,
  loginUser,
  loginStatus,
  logoutUser,
};
