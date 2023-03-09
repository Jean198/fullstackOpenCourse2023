const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);

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
  const newBlog = {
    title: 'thirdTestBlog',
    author: 'Jean Niyigaba',
    url: 'testUrl',
    likes: 134,
  };

  await api
    .post('/api/blogs/postblog')
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

test('Blog with likes property missing will default to the value 0 ', async () => {
  const newBlog = {
    title: 'blog with no likes',
    author: 'Taru Niyigaba',
    url: 'test url',
  };

  const response = await api
    .post('/api/blogs/postblog')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  expect(response.body.likes).toEqual(0);
});
