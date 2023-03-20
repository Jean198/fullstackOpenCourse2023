import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import { notificationHandler } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const { anecdotes, filter } = useSelector((state) => state);

  const displayedAnecdotes = anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );

  const vote = (id, content) => {
    dispatch(addVote(id));
    dispatch(notificationHandler(`You voted: ${content}`));
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
              <button onClick={() => vote(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
