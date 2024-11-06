import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';
import InboxPage from './InboxPage';
import TodayPage from './TodayPage'; // Import TodayPage
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

  // Fetch categories and priorities from the backend when the component mounts
  useEffect(() => {
    if (isLoggedIn) {
      fetchCategories();
      fetchPriorities();
      fetchTasks();
      fetchTodayTasks();
    }
  }, [isLoggedIn]);

  // Function to fetch categories
  const fetchCategories = () => {
    axios.get('http://127.0.0.1:5001/categories')
      .then(response => {
        const categoriesWithColors = response.data.map(category => ({
          ...category,
          color: getRandomColor()
        }));
        setCategories(categoriesWithColors);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  };

  // Function to fetch priorities
  const fetchPriorities = () => {
    axios.get('http://127.0.0.1:5001/priorities')
      .then(response => {
        setPriorities(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the priorities!', error);
      });
  };

  // Function to fetch tasks
  const fetchTasks = () => {
    axios.get('http://127.0.0.1:5001/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  };

  // Function to fetch tasks due today
  const fetchTodayTasks = () => {
    axios.get('http://127.0.0.1:5001/tasks/today')
      .then(response => {
        setTodayTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching todays tasks!', error);
      });
  };

  // Function to add a new task
  const addTask = (newTask) => {
    axios.post('http://127.0.0.1:5001/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        fetchTodayTasks(); // Refresh today's tasks after adding a new task
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });
  };

  // Function to add a new category
  const addCategory = (newCategory) => {
    axios.post('http://127.0.0.1:5001/categories', newCategory)
      .then(response => {
        const categoryWithColor = {
          ...response.data,
          color: getRandomColor()
        };
        setCategories([...categories, categoryWithColor]);
      })
      .catch(error => {
        console.error('There was an error creating the category!', error);
      });
  };

  // Function to add a new priority
  const addPriority = (newPriority) => {
    axios.post('http://127.0.0.1:5001/priorities', newPriority)
      .then(response => {
        setPriorities([...priorities, response.data]);
      })
      .catch(error => {
        console.error('There was an error creating the priority!', error);
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

  // Function to update a priority
  const updatePriority = (id, updatedPriority) => {
    axios.put(`http://127.0.0.1:5001/priorities/${id}`, updatedPriority)
      .then(response => {
        setPriorities(priorities.map(priority => priority._id === id ? response.data : priority));
      })
      .catch(error => {
        console.error('There was an error updating the priority!', error);
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

  // Function to delete a priority
  const deletePriority = (id) => {
    axios.delete(`http://127.0.0.1:5001/priorities/${id}`)
      .then(response => {
        setPriorities(priorities.filter(priority => priority._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the priority!', error);
      });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <div className="App">
        {isLoggedIn ? (
          <div className="app-container">
            <Sidebar
              categories={categories}
              deleteCategory={deleteCategory}
              addCategory={addCategory}
              priorities={priorities}
              deletePriority={deletePriority}
              addPriority={addPriority}
            />
            <Routes>
              <Route path="/" element={<Navigate to="/inbox" />} />
              <Route path="/inbox" element={<InboxPage tasks={tasks} title="Inbox" />} />
              <Route path="/today" element={<TodayPage tasks={todayTasks} title="Today's Tasks" />} /> {/* Pass today's tasks */}
              <Route path="/calendar" element={<Calendar tasks={tasks} />} />
              <Route path="/new-task" element={<NewTask addTask={addTask} categories={categories} priorities={priorities} />} />
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
