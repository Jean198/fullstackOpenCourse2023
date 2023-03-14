import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import userService from './services/user';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import { getLoginStatus } from './services/user';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  }, [user]);

  useEffect(() => {
    async function logiStatus() {
      const status = await getLoginStatus();
      setLoginStatus(status);
    }

    logiStatus();
  }, [setLoginStatus]);

  useEffect(() => {
    if (loginStatus) {
      const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
      if (loggedInUserJSON) {
        const user = JSON.parse(loggedInUserJSON);
        setUser(user);
      }
    }
  }, [loginStatus]);

  //--------------------------------------------------------------------------------------------------------------

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await userService.userLogin({
        username,
        password,
      });

      if (loginStatus) {
        window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      }

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('Wrong credentials');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    console.log('logging in with', username, password);
  };

  //----------------------------------------------------------------------------------------------

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => {
            setUsername(target.value);
          }}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  //--------------------------------------------------------------------------------------------------------

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      await blogService.createBlog({
        title: newBlog,
        author: newAuthor,
        url: newUrl,
      });
      setNewBlog('');
      setNewAuthor('');
      setNewUrl('');
      setNotificationMessage('success');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (error) {
      console.log('I am here...');
      setNotificationMessage('error');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  //----------------------------------------------------------------------------------------------------------------
  return (
    <div>
      <div>
        <Notification message={notificationMessage} />
      </div>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>{' '}
          <button
            onClick={() => {
              userService.logoutUser();
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            Logout
          </button>
          <BlogForm
            addBlog={addBlog}
            handleBlogChange={handleBlogChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            newBlog={newBlog}
            newAuthor={newAuthor}
            newUrl={newUrl}
          />
        </div>
      )}

      <h2>blogs</h2>
      {user &&
        blogs.map((blog, index) => {
          return (
            <div key={index}>
              {' '}
              <p>
                {blog.title} {blog.author}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default App;
