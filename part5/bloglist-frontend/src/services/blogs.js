import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createBlog = async (newBlog) => {
  const response = await axios.post(`${baseUrl}/createblog`, newBlog);
  return response.data;
};

const updateBlog = async (id, newBlog) => {
  const response = await axios.patch(`${baseUrl}/${id}`, newBlog);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, updateBlog };
