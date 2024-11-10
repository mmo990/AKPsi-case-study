import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';
import InboxPage from './InboxPage';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]); // Start with an empty task list
  const [categories, setCategories] = useState([]); // Start with an empty category list
  const [priorities, setPriorities] = useState([]); // Start with an empty priority list
  const [todayTasks, setTodayTasks] = useState([]); // Start with an empty list for today's tasks

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Function to get or generate a color for a category
  const getCategoryColor = (categoryName) => {
    const storedColors = JSON.parse(localStorage.getItem('categoryColors')) || {};
    if (!storedColors[categoryName]) {
      storedColors[categoryName] = getRandomColor();
      localStorage.setItem('categoryColors', JSON.stringify(storedColors));
    }
    return storedColors[categoryName];
  };

  // Fetch categories and priorities from the backend when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      fetchCategories();
    }
  }, [isLoggedIn]);

  // Function to fetch categories
  const fetchCategories = () => {
    axios.get('http://127.0.0.1:5001/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  };

  // Function to add a new category
  const addCategory = (newCategory) => {
    axios.post('http://127.0.0.1:5001/categories', newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
      })
      .catch(error => {
        console.error('There was an error creating the category!', error);
      });
  };

  // Function to update a category
  const updateCategory = (id, updatedCategory) => {
    axios.put(`http://127.0.0.1:5001/categories/${id}`, updatedCategory)
      .then(response => {
        setCategories(categories.map(category => category._id === id ? response.data : category));
      })
      .catch(error => {
        console.error('There was an error updating the category!', error);
      });
  };

  // Function to delete a category
  const deleteCategory = (id) => {
    axios.delete(`http://127.0.0.1:5001/categories/${id}`)
      .then(response => {
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the category!', error);
      });
  };

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
            <Sidebar categories={categories} />
            <Routes>
              <Route path="/" element={<Navigate to="/inbox" />} />
              <Route path="/inbox" element={<InboxPage tasks={tasks} title="Inbox" />} />
              <Route path="/today" element={<InboxPage tasks={tasks.filter(task => new Date().getDate() === task.date)} title="Today's Tasks" />} />
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