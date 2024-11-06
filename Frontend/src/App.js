import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';
import InboxPage from './InboxPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // Start with an empty task list
  const [categories, setCategories] = useState([]); // Start with an empty category list
  const [selectedDate, setSelectedDate] = useState(new Date()); // Track selected date

  // Add a new task to the list
  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  // Filter tasks based on the selected date
  const filterTasksByDate = (date) => {
    return tasks.filter(
      (task) => new Date(task.date).toDateString() === new Date(date).toDateString()
    );
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <div className="app-container">
            <Sidebar categories={categories} onDateSelect={handleDateSelect} />
            <Routes>
              <Route path="/" element={<Navigate to="/inbox" />} />
              <Route path="/inbox" element={<InboxPage tasks={tasks} title="Inbox" />} />
              <Route
                path="/today"
                element={
                  <InboxPage
                    tasks={filterTasksByDate(selectedDate)}
                    title={`Tasks for ${selectedDate.toDateString()}`}
                  />
                }
              />
              <Route
                path="/calendar"
                element={<Calendar tasks={tasks} selectedDate={selectedDate} onDateSelect={handleDateSelect} />}
              />
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
