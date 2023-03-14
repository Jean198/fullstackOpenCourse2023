const BlogForm = ({
  addBlog,
  newBlog,
  handleAuthorChange,
  handleBlogChange,
  handleUrlChange,
  newAuthor,
  newUrl,
}) => {
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
