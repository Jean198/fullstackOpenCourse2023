import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const dispatch = useDispatch();

  const createNewAnecdote = (e, content) => {
    e.preventDefault();
    console.log(content);
    dispatch(createAnecdote(content));
    setNewAnecdote('');
  };

  return (
    <form>
      <h2>create new</h2>
      <div>
        <input
          onChange={(e) => setNewAnecdote(e.target.value)}
          value={newAnecdote}
        />
      </div>
      <button onClick={(e) => createNewAnecdote(e, newAnecdote)}>create</button>
    </form>
  );
};

export default AnecdoteForm;
