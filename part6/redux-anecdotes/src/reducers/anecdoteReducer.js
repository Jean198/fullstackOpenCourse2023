import { createSlice } from '@reduxjs/toolkit';

/*const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];



const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
*/

const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const noteToEdit = state.find((note) => note.id === id);
      const editedNote = {
        ...noteToEdit,
        votes: noteToEdit.votes + 1,
      };
      return state.map((note) => (note.id !== id ? note : editedNote));
    },
    createAnecdote(state, action) {
      const newAnecdote = action.payload;
      state.push(newAnecdote);
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, createAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions;

export default anecdoteSlice.reducer;
