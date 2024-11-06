import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTask({ addTask, categories, priorities }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const task = {
        date, // Use the selected date
        text: name, // Change 'name' to 'text' to match your calendar structure
        color: priority === 'Priority 1' ? 'orange' : 'blue', // Assign a color based on priority
        description,
        priority,
        category,
        dueDate
      };
      addTask(task); // Add the task to the main task list
      navigate('/today'); // Redirect to today's page after adding task
    }
  };

  return (
    <div className="main">
      <h2 className="title">New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="task-options">
          <div className="due-date">
            <label>Due Date</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              placeholderText="Select due date"
              className="date-picker"
              dateFormat="MM/dd/yyyy"
            />
          </div>
          <div className="dropdown">
            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="">Select a priority</option>
              {priorities.map((pri, index) => (
                <option key={index} value={pri.name}>{pri.name}</option>
              ))}
            </select>
          </div>
          <div className="dropdown">
            <label>Categories</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  <span style={{ backgroundColor: cat.color, borderRadius: '50%', display: 'inline-block', width: '10px', height: '10px', marginRight: '5px' }}></span>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="submit-btn">Add Task</button>
      </form>
    </div>
  );
}

export default NewTask;