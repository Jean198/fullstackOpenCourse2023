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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
