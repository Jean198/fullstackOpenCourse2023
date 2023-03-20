import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

//-------------------------------------------------------------------------------------

let timeout = null;

export const notificationHandler = (message) => {
  return async (dispatch) => {
    dispatch(setNotification(message));

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => dispatch(setNotification(null)), 5000);
  };
};
