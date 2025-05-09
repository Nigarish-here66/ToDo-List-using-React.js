import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './components/create';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get('http://localhost:5000/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h2>My To-Do List</h2>
      <Create onUpdate={fetchTodos} />
      {todos.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onUpdate={fetchTodos} />
        ))
      )}
    </div>
  );
}

const TodoItem = ({ todo, onUpdate }) => {
  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const updateTodo = async () => {
    await axios.put(`http://localhost:5000/todos/${todo._id}`, { text: newText });
    setEditMode(false);
    onUpdate();
  };

  const deleteTodo = async () => {
    await axios.delete(`http://localhost:5000/todos/${todo._id}`);
    onUpdate();
  };

  return (
    <div className="todo-item">
      {editMode ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <div className="todo-actions">
            <button onClick={updateTodo}>Save</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <span>{todo.text}</span>
          <div className="todo-actions">
            <button onClick={() => setEditMode(true)}>Edit</button>
            <button onClick={deleteTodo}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
