import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([
    { date: 2, text: 'Do Laundry', color: 'orange' },
    { date: 4, text: 'Work On Case Study', color: 'blue' },
    // ... other initial tasks
  ]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <div className="app-container">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Navigate to="/calendar" />} />
              <Route path="/calendar" element={<Calendar tasks={tasks} />} />
              <Route path="/new-task" element={<NewTask addTask={addTask} />} />
            </Routes>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
