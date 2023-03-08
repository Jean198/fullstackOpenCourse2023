const dummy = (blogs) => {
  return 1;
};

const totalLikes = (array) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };

  const total = array.reduce(reducer, 0);

  return array.length === 0 ? 0 : total;
};
module.exports = {
  dummy,
  totalLikes,
};
