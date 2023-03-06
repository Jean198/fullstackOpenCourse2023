import React from 'react';

const Filter = ({ handleSearch }) => {
  return (
    <div>
      search person: <input onChange={handleSearch} />
    </div>
  );
};

export default Filter;
