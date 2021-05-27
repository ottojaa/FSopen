import React, { useState } from "react";

const filterByName = (person, filter) => {
  return person.name.toUpperCase().includes(filter.toUpperCase());
};

const PersonForm = (props) => {
  return (
    <form>
      <div>
        name: <input id="name" value={props.newName} onChange={props.handleSetNewName} />
      </div>
      <div>
        number: <input id="number" value={props.newNumber} onChange={props.handleSetNewNumber} />
      </div>
      <div>
        <button type="submit" onClick={props.handleAddNewPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <ul>
      {persons
        .filter((person) => filterByName(person, filter))
        .map((person) => (
          <li key={person.name}>
            {person.name} {person.number}
          </li>
        ))}
    </ul>
  );
};

const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      filter shown with: <input id="filter" onChange={handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "3498394" }]);
  const [filter, setFilter] = useState("");
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSetNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSetNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddNewPerson = (event) => {
    event.preventDefault();
    const duplicate = persons.find((person) => person.name === newName);

    if (duplicate) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons([...persons, { name: newName, number: newNumber }]);
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}></Filter>
      <h3>Add a new</h3>
      <PersonForm
        handleSetNewName={handleSetNewName}
        handleSetNewNumber={handleSetNewNumber}
        handleAddNewPerson={handleAddNewPerson}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
