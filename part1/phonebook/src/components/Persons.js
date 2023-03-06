import React from 'react';
import Person from './Person';

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      <div>
        {filteredPersons.map((person) => {
          return <Person person={person} key={person.name} />;
        })}
      </div>
    </div>
  );
};

export default Persons;
