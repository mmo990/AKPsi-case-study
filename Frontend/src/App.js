import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';
import InboxPage from './InboxPage';
import AddPage from './AddPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // Start with an empty task list

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
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
              <Route path="/" element={<Navigate to="/inbox" />} />
              <Route path="/inbox" element={<InboxPage tasks={tasks} title="Inbox" />} />
              <Route path="/today" element={<InboxPage tasks={tasks} title="Today's Tasks" />} /> {/* Set title for Today */}
              <Route path="/calendar" element={<Calendar tasks={tasks} />} />
              <Route path="/new-task" element={<NewTask addTask={addTask} />} />
              <Route path="/add" element={<AddPage />} />
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
