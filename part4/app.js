const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./utils/config');
const blogsRouter = require('./routes/blogRouter');
const usersRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');

console.log('connecting to', config.DATABASE_URI);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Homepage');
});

app.use(errorHandler);

mongoose.connect(config.DATABASE_URI).then(() => {
  app.listen(3003, () => {
    console.log(`Server running on port 3003`);
  });
});

module.exports = app;
