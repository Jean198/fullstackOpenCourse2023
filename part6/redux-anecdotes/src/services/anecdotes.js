import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0, id: getId() };
  const response = await axios.post(baseUrl, object);
  console.log(response.data);
  return response.data;
};

const editAnecdote = async (anecdote) => {
  const { id } = anecdote;
  const votes = { votes: anecdote.votes + 1 };
  const response = await axios.patch(`${baseUrl}/${id}`, votes);
  console.log(response.data);
  return response.data;
};

const anecdoteService = {
  getAll,
  createNew,
  editAnecdote,
};
export default anecdoteService;
