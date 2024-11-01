import React, { useState } from "react";

function NewTask({ addTask }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(1); // Default to first day of the month
  const [priority, setPriority] = useState("Priority 1");
  const [category, setCategory] = useState("Work");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      date,
      text: taskName,
      color: category === "Work" ? "blue" : "orange",
    };
    addTask(newTask); // Add the new task to the calendar
    setTaskName("");
    setDescription("");
  };

  return (
    <div className="main">
      <h2 className="title">New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
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
            <select value={date} onChange={(e) => setDate(Number(e.target.value))}>
              {[...Array(30)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
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
