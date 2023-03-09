const lodash = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  const total = blogs.reduce(reducer, 0);

  return blogs.length === 0 ? 0 : total;
};

const favoriteBlog = (blogs) => {
  const reducer = (mostFavoriteBlog, blog) => {
    if (mostFavoriteBlog.likes > blog.likes) {
      return mostFavoriteBlog;
    } else {
      return blog;
    }
  };

  return blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
  return lodash
    .chain(blogs)
    .groupBy('author')
    .map((authorBlogs, currentAuthor) => {
      return { author: currentAuthor, blogs: authorBlogs.length };
    })
    .reduce((a, b) => {
      if (a.blogs > b.blogs) {
        return a;
      }
      return b;
    })
    .value();
};

const mostLikes = (blogs) => {
  return lodash
    .chain(blogs)
    .groupBy('author')
    .map((authorBlogs, currentAuthor) => {
      return {
        author: currentAuthor,
        likes: authorBlogs.map((blog) => blog.likes).reduce((a, b) => a + b),
      };
    })
    .reduce((a, b) => {
      if (a.likes > b.likes) {
        return a;
      }
      return b;
    })
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
