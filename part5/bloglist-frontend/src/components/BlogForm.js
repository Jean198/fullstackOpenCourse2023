import React, { useState } from 'react';

const BlogForm = ({ addNewBlog }) => {
  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();
    addNewBlog({
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    });
    setNewBlog('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' value={newBlog} onChange={handleBlogChange} />
        </div>
        <div>
          author:
          <input id='author' value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url:
          <input id='url' value={newUrl} onChange={handleUrlChange} />
        </div>
        <button id='create-button' type='submit'>
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
