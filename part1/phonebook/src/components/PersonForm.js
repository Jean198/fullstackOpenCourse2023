import React from 'react';

const PersonForm = ({
  handleNameChange,
  handlePhoneChange,
  handleSubmit,
  newName,
  phone,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <br />
      <br />
      <div>
        name: <input onChange={handleNameChange} value={newName} />
      </div>{' '}
      <br />
      <div>
        Phone: <input type='text' onChange={handlePhoneChange} value={phone} />
      </div>
      <br />
      <br />
      <div>
        <button type='submit'>add</button>
      </div>
      <br />
      <br />
    </form>
  );
};

export default PersonForm;
