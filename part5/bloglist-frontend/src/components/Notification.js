import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  } else {
    if (message.includes('error')) {
      return <div className='error-notification'>{message}</div>;
    }
    return <div className='success-notification'>{message}</div>;
  }
};

export default Notification;
