import React, { useState } from 'react';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [tasks, setTasks] = useState([
    { date: 2, text: 'Do Laundry', color: 'orange' },
    { date: 4, text: 'Work On Case Study', color: 'blue' },
    // ... other initial tasks
  ]);

  // Function to add a new task
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  // Function to handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div className="app-container">
          <Sidebar />
          <Calendar tasks={tasks} />
          <NewTask addTask={addTask} />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
