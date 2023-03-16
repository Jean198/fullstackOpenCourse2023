import axios from 'axios';
const baseUrl = '/api/users';

const userLogin = async (credentials) => {
  const response = await axios.post(`${baseUrl}/loginuser`, credentials);
  return response.data;
};

// Get Login Status
export const getLoginStatus = async () => {
  try {
    const response = await axios.get(`${baseUrl}/loggedin`);
    if (response.data !== true) {
      return false;
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
  }
};

//logout user
export const logoutUser = async () => {
  try {
    await axios
      .get(`${baseUrl}/logout`)
      .then((response) => console.log(response));
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.log(message);
  }
};

export default { userLogin, getLoginStatus, logoutUser };
