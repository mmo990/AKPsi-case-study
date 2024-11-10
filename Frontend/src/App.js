import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Calendar from './Calendar';
import Sidebar from './Sidebar';
import NewTask from './NewTask';
import Login from './Login';
import InboxPage from './InboxPage';
import TodayPage from './TodayPage';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);

  const getRandomColor = useCallback(() => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const getCategoryColor = useCallback((categoryName) => {
    const storedColors = JSON.parse(localStorage.getItem('categoryColors')) || {};
    if (!storedColors[categoryName]) {
      storedColors[categoryName] = getRandomColor();
      localStorage.setItem('categoryColors', JSON.stringify(storedColors));
    }
    return storedColors[categoryName];
  }, [getRandomColor]);

  const fetchCategories = useCallback(() => {
    axios.get('http://127.0.0.1:5001/categories')
      .then(response => {
        const categoriesWithColors = response.data.map(category => ({
          ...category,
          color: getCategoryColor(category.name)
        }));
        setCategories(categoriesWithColors);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [getCategoryColor]);

  const fetchTasks = useCallback(() => {
    axios.get('http://127.0.0.1:5001/tasks')
      .then(response => {
        const tasksWithColors = response.data.map(task => {
          const category = categories.find(cat => cat.name === task.category);
          return {
            ...task,
            color: category ? category.color : '#e0e0e0'
          };
        });
        setTasks(tasksWithColors);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, [categories]);

  const fetchPriorities = () => {
    axios.get('http://127.0.0.1:5001/priorities')
      .then(response => {
        setPriorities(response.data);
      })
      .catch(error => {
        console.error('Error fetching priorities:', error);
      });
  };

  const fetchTodayTasks = () => {
    axios.get('http://127.0.0.1:5001/tasks/today')
      .then(response => {
        setTodayTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching today\'s tasks:', error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchCategories();
      fetchPriorities();
      fetchTasks();
      fetchTodayTasks();
    }
  }, [isLoggedIn, fetchCategories, fetchTasks]);

  const addTask = (newTask) => {
    axios.post('http://127.0.0.1:5001/tasks', newTask)
      .then(response => {
        setTasks([...tasks, response.data]);
        fetchTodayTasks();
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  };

  const deleteTask = (id) => {
    axios.delete(`http://127.0.0.1:5001/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task._id !== id));
        fetchTodayTasks();
      })
      .catch(error => {
        console.error('Error deleting task:', error);
      });
  };

  const addCategory = (newCategory) => {
    axios.post('http://127.0.0.1:5001/categories', newCategory)
      .then(response => {
        const categoryWithColor = {
          ...response.data,
          color: getCategoryColor(response.data.name)
        };
        setCategories([...categories, categoryWithColor]);
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
  };

  const deleteCategory = (id) => {
    axios.delete(`http://127.0.0.1:5001/categories/${id}`)
      .then(() => {
        setCategories(categories.filter(category => category._id !== id));
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  const addPriority = (newPriority) => {
    axios.post('http://127.0.0.1:5001/priorities', newPriority)
      .then(response => {
        setPriorities([...priorities, response.data]);
      })
      .catch(error => {
        console.error('Error creating priority:', error);
      });
  };

  const deletePriority = (id) => {
    axios.delete(`http://127.0.0.1:5001/priorities/${id}`)
      .then(() => {
        setPriorities(priorities.filter(priority => priority._id !== id));
      })
      .catch(error => {
        console.error('Error deleting priority:', error);
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
              <Route path="/" element={<Navigate to="/inbox" replace />} />
              <Route path="/inbox" element={<InboxPage tasks={tasks} title="Inbox" />} />
              <Route path="/today" element={<TodayPage tasks={todayTasks} title="Today's Tasks" />} />
              <Route path="/calendar" element={<Calendar tasks={tasks} deleteTask={deleteTask} />} />
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
