import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewTask({ addTask, categories, priorities }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && dueDate && priority && category) {
      const newTask = {
        taskName: name,
        description,
        due_date: dueDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
        priority,
        category
      };
      addTask(newTask); // Pass the new task to the addTask function
      navigate('/today'); // Redirect to today's tasks page after adding the task
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
        <div className="dropdown">
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
        <button type="submit" className="submit-btn">Add Task</button>
      </form>
    </div>
  );
}

export default NewTask;