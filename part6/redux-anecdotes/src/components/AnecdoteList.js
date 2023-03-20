import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addVote,
  initializeAnecdotes,
  voteAnecdote,
} from '../reducers/anecdoteReducer';
import { notificationHandler } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => state);

  const displayedAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(notificationHandler(`You voted: ${anecdote.content}`, 5));
  };
  return (
    <div>
      {' '}
      {displayedAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
