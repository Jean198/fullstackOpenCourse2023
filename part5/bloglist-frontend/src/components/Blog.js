import { useState } from 'react';

const Blog = ({ blog }) => {
  const [details, setDetails] = useState(false);
  return (
    <div className='single-blog-container'>
      <div>
        {blog.title}{' '}
        <button onClick={() => setDetails(!details)}>
          {details ? 'Hide' : 'View'}
        </button>
      </div>
      {details && (
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes} <button>Like</button>
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
