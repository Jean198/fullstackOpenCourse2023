import { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import userService from './services/user';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import { getLoginStatus } from './services/user';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import Blog from './components/Blog';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginStatus, setLoginStatus] = useState(false);

  const blogFormRef = useRef();

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

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('error: Wrong credentials');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
    console.log('logging in with', username, password);
  };

  //----------------------------------------------------------------------------------------------

  //--------------------------------------------------------------------------------------------------------

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const createdBlog = await blogService.createBlog({
        newBlog,
      });
      setNotificationMessage('success');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
      createdBlog.user = user;
      setBlogs(blogs.concat(createdBlog));
    } catch (error) {
      console.log('I am here...');
      setNotificationMessage('error');
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  //----------------------------------------------------------------------------------------------------------------

  const loginForm = () => (
    <Togglable buttonLabel='login' buttonLabel2='cancel'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

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
          <Togglable
            buttonLabel='create blog'
            buttonLabel2='cancel'
            ref={blogFormRef}
          >
            <BlogForm addNewBlog={addBlog} />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {user &&
        blogs.map((blog, index) => {
          return <Blog blog={blog} key={index} />;
        })}
    </div>
  );
};

export default App;
