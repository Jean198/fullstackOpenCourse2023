import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    if (message.includes('error')) {
      return <div className='error-notification message'>{message}</div>;
    }
    return <div className='success-notification message'>{message}</div>;
  }
};

export default Notification;
