import axios from 'axios';

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

// Function to fetch categories
export const fetchCategories = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/categories');
    const categoriesWithColors = response.data.map(category => ({
      ...category,
      color: getCategoryColor(category.name)
    }));
    return categoriesWithColors;
  } catch (error) {
    console.error('There was an error fetching the categories!', error);
    throw error;
  }
};

// Function to fetch priorities
export const fetchPriorities = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/priorities');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the priorities!', error);
    throw error;
  }
};

// Function to fetch tasks
export const fetchTasks = async (categories) => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/tasks');
    const tasksWithColors = response.data.map(task => {
      const category = categories.find(cat => cat.name === task.category);
      return {
        ...task,
        color: category ? category.color : '#e0e0e0' // Default color if category not found
      };
    });
    return tasksWithColors;
  } catch (error) {
    console.error('There was an error fetching the tasks!', error);
    throw error;
  }
};

// Function to fetch tasks due today
export const fetchTodayTasks = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:5001/tasks/today');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching today\'s tasks!', error);
    throw error;
  }
};