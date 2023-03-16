import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

test('Blog Component renders title and author, but does not render url and likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jean Niyigaba',
    url: 'www.jean.fi',
    likes: 50,
  };

  const component = render(<Blog blog={blog} />);

  component.debug();

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );

  expect(component.container).toHaveTextContent('Jean Niyigaba');

  expect(component.container).not.toHaveTextContent('www.jean.fi');

  expect(component.container).not.toHaveTextContent(50);
});

//----------------------------------------------------------------------------------------

test('url and likes will be shown by clicking the view button', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jean Niyigaba',
    url: 'www.jean.fi',
    likes: 50,
    user: {
      name: 'users name',
    },
  };

  const component = render(<Blog blog={blog} user={blog.user} />);

  const button = component.getByText('View');
  fireEvent.click(button);

  component.debug();

  expect(component.container).toHaveTextContent('www.jean.fi');
  expect(component.container).toHaveTextContent(50);
});

//----------------------------------------------------------------------------------------

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jean Niyigaba',
    url: 'www.jean.fi',
    likes: 50,
    user: {
      name: 'users name',
    },
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} user={blog.user} updateBlog={mockHandler} />
  );

  const button = component.getByText('View');
  fireEvent.click(button);

  const buttonLikes = component.getByText('Like');
  fireEvent.click(buttonLikes);
  fireEvent.click(buttonLikes);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
