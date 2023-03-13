const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const cookieParser = require('cookie-parser');
const authMiddleware = require('../middlewares/authMiddleware');

app.use(cookieParser());
app.use(authMiddleware);

const initialBlogs = [
  {
    title: 'firstBlog',
    author: 'firstAuthor',
    url: 'htpp1',
  },
  {
    title: 'secondBlog',
    author: 'secondAuthor',
    url: 'htpp2',
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = await User.create({ username: 'root', passwordHash });
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

test('blogs are identified by id', async () => {
  const response = await api.get('/api/blogs');

  const contents = response.body.map((blog) => blog.id);
  expect(contents).toBeDefined();
});

test('A new blog can be added ', async () => {
  const request = await api.post('/api/users/loginuser').send({
    username: 'root',
    password: 'sekret',
  });

  const users = await helper.usersInDb();

  const token = request.body.token;

  const newBlog = {
    title: 'thirdTestBlog',
    author: 'Jean Niyigaba',
    url: 'testUrl',
    likes: 134,
    userId: users[0].id,
  };

  await api
    .post('/api/blogs/createblog')
    .set('Cookie', `token=${token}`)
    .expect(201)
    .send(newBlog)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
});

test('Blog with likes property missing will default to the value 0 ', async () => {
  const request = await api.post('/api/users/loginuser').send({
    username: 'root',
    password: 'sekret',
  });

  const users = await helper.usersInDb();

  const token = request.body.token;

  const newBlog = {
    title: 'blog with no likes',
    author: 'Taru Niyigaba',
    url: 'test url',
    userId: users[0],
  };

  const response = await api
    .post('/api/blogs/createblog')
    .set('Cookie', `token=${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});

test('blog without title is not  added', async () => {
  const request = await api.post('/api/users/loginuser').send({
    username: 'root',
    password: 'sekret',
  });

  const users = await helper.usersInDb();

  const token = request.body.token;

  const newBlog = {
    author: 'Koukou',
    like: 345,
    url: 'test url',
  };

  await api
    .post('/api/blogs/createblog')
    .set('Cookie', `token=${token}`)
    .expect(400);
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length);
});

//----------------------------------------------------------------------------------------------------------------

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = await User.create({ username: 'root', passwordHash });
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

//----------------------------------------------------------------------------------------------------------

describe('when there is initially one user in db', () => {
  // ...

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('username has already been used');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test('userCreation fails if username is not long enough', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);
    expect(result.body.message).toContain(
      'Username must be atleast to 3 characters'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('user with username missing is not added', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('Please fill in all required fields');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('userCreation fails if password is not long enough', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root2',
      name: 'Superuser',
      password: 'se',
    };

    const result = await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain(
      'Password must be atleast 3 characters long'
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('user without password is not added', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root3',
      name: 'Superuser',
    };

    const result = await api
      .post('/api/users/createuser')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.message).toContain('Please fill in all required fields');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});
