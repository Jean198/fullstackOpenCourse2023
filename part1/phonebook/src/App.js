import { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

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
      <Filter handleSearch={handleSearch} />
      <h3>Add a new person</h3>
      <PersonForm
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handleSubmit={handleSubmit}
        newName={newName}
        phone={phone}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
