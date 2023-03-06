import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '+359876980808' },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSearch = (e) => {
    const searchString = e.target.value;
    setFilteredPersons(
      persons.filter((person) =>
        person.name
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      )
    );
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      persons.some(
        (person) =>
          person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: phone,
      };
      setPersons([...persons, newPerson]);
      setFilteredPersons([...persons, newPerson]);
      setPhone('');
      setNewName('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          search person: <input onChange={handleSearch} />
        </div>
        <br />
        <br />
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>{' '}
        <br />
        <div>
          Phone:{' '}
          <input type='text' onChange={handlePhoneChange} value={phone} />
        </div>
        <br />
        <br />
        <div>
          <button type='submit'>add</button>
        </div>
        <br />
        <br />
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map((person) => {
          return (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default App;
