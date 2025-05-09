import React, { useState } from 'react';
import axios from 'axios';

const Create = ({ onUpdate }) => {
  const [task, setTask] = useState("");

  const addTask = async () => {
    if (!task.trim()) return;
    await axios.post('http://localhost:5000/todo', { text: task });
    setTask("");
    onUpdate();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
};

export default Create;
