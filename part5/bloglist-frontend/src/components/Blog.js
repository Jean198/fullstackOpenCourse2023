import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [details, setDetails] = useState(false);

  const handleBlogLike = () => {
    const newBlog = {
      title: blog.title,
      url: blog.url,
      likes: blog.likes + 1,
      author: blog.author,
      user: blog.user.id,
      id: blog.id,
    };
    updateBlog(newBlog);
  };

  return (
    <div className='single-blog-container blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setDetails(!details)} id='view'>
          {details ? 'Hide' : 'View'}
        </button>
      </div>
      {details && (
        <div className='blog-details'>
          <p>{blog.url}</p>
          <p>
            Likes {blog.likes} <button onClick={handleBlogLike}>Like</button>
          </p>
          <p>{blog.user.name}</p>

          <button
            className='remove-blog'
            onClick={() => removeBlog(blog)}
            id='remove'
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
