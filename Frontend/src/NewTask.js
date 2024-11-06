import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTask({ addTask, addCategory, categories }) {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [priority, setPriority] = useState('Priority 1');
  const [priorities, setPriorities] = useState(['Priority 1', 'Priority 2']); // Initial priorities
  const navigate = useNavigate();

  const handlePriorityChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === 'add_new_priority') {
      addNewPriority();
    } else {
      setPriority(selectedValue);
    }
  };

  const addNewPriority = () => {
    const newPriority = prompt('Enter new priority name:');
    if (newPriority && !priorities.includes(newPriority)) {
      setPriorities([...priorities, newPriority]);
      setPriority(newPriority); // Automatically select the new priority
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      taskName,
      description,
      due_date: dueDate,
      category,
      priority: 'Medium' // Example priority, you can change this as needed
    };
    addTask(newTask);
    setTaskName('');
    setDescription('');
    setDueDate('');
    setCategory('');
    navigate('/today'); // Redirect to today's page after adding task
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ name: newCategory });
      setNewCategory('');
    }
  };

  return (
    <div className="main">
      <h2 className="title">New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <div>
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
          />
          <button type="button" onClick={handleAddCategory}>Add Category</button>
        </div>
        <div className="dropdown">
          <label>Priority</label>
          <select value={priority} onChange={handlePriorityChange}>
            {priorities.map((pri, index) => (
              <option key={index} value={pri}>{pri}</option>
            ))}
            <option value="add_new_priority">+ Add New Priority</option> {/* Plus sign option */}
          </select>
        </div>
        <button type="submit" className="submit-btn">Add Task</button>
      </form>
    </div>
  );
}

export default NewTask;