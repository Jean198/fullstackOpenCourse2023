import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const votedAnecdote = action.payload;
      const { id } = votedAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    },
    loadAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, setAnecdote, loadAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;

//---------------------------------------------------------------------------------------

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(loadAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.editAnecdote(anecdote);
    dispatch(addVote(votedAnecdote));
  };
};
