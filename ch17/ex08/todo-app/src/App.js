import './App.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    const todo = inputValue.trim();
    setInputValue('');
    setItems([
      ...items,
      {
        id: uuidv4(),
        text: todo,
        isCompleted: false,
      },
    ]);
  };
  const handleItemDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  const handleItemToggle = (id) => {
    setItems(
      items.map((item) => {
        return item.id === id
          ? { ...item, isCompleted: !item.isCompleted }
          : item;
      })
    );
  };
  console.log('app changed items=' + items);
  return (
    <>
      <main>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputValue}
            placeholder="What needs to be done?"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <input type="checkbox" onChange={() => handleItemToggle(item.id)}></input>
              <label
                style={{
                  textDecoration: item.isCompleted ? 'line-through' : 'none',
                }}
              >
                {item.text}
              </label>
              <button onClick={() => handleItemDelete(item.id)}>❌</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default App;
