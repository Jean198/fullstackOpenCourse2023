const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const config = require('./utils/config');
const blogsRouter = require('./routes/blogRouter');

console.log('connecting to', config.DATABASE_URI);

mongoose.connect(config.DATABASE_URI);

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogsRouter);

module.exports = app;
