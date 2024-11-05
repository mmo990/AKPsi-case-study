import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function NewTask({ addTask }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Priority 1');
  const [category, setCategory] = useState('Work');
  const [date, setDate] = useState(new Date().getDate()); // Default to today's date
  const navigate = useNavigate();
  const [dueDate, setDueDate] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      const task = {
        date, // Use the selected date
        text: name, // Change 'name' to 'text' to match your calendar structure
        color: priority === 'Priority 1' ? 'orange' : 'blue', // Assign a color based on priority
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
              <option>Priority 1</option>
              <option>Priority 2</option>
            </select>
          </div>
          <div className="dropdown">
            <label>Categories</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Work</option>
              <option>Personal</option>
            </select>
          </div>
        </div>
        <button type="submit" className="submit-btn">Add Task</button>
      </form>
    </div>
  );
}

export default NewTask;