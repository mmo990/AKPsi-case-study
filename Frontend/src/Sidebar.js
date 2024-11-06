import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar({ categories, deleteCategory, addCategory, priorities, deletePriority, addPriority }) {
  const [newCategory, setNewCategory] = useState('');
  const [newPriority, setNewPriority] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ name: newCategory });
      setNewCategory('');
    }
  };

  const handleAddPriority = () => {
    if (newPriority.trim()) {
      addPriority({ name: newPriority });
      setNewPriority('');
    }
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">📅</span>
        <h2> TO - DO </h2>
      </div>
      <ul className="menu">
        <li><Link to="/today" className="menu-link">Today</Link></li>
        <li><Link to="/new-task" className="menu-link">New Task</Link></li>
        <li><Link to="/inbox" className="menu-link">Inbox</Link></li>
        <li><Link to="/calendar" className="menu-link">Calendar (Month View)</Link></li>
      </ul>
      <br />
      <div className="dropdown-heading">Categories</div>
      <ul className="category-list">
        {categories.map(category => (
          <li key={category._id} className="category-item">
            <span className="category-color" style={{ backgroundColor: category.color }}></span> {category.name} <span className="badge"> {category.count || 0}</span>
            <button className="delete-button" onClick={() => deleteCategory(category._id)}>-</button>
          </li>
        ))}
      </ul>
      <div className="add-category">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Add new category"
        />
        <button onClick={handleAddCategory}>+</button>
      </div>
      <br />
      <div className="dropdown-heading">Priority</div>
      <ul className="priority-list">
        {priorities.map(priority => (
          <li key={priority._id} className="priority-item">
            {priority.name} <span className="badge"> {priority.count || 0}</span>
            <button className="delete-button" onClick={() => deletePriority(priority._id)}>-</button>
          </li>
        ))}
      </ul>
      <div className="add-priority">
        <input
          type="text"
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          placeholder="Add new priority"
        />
        <button onClick={handleAddPriority}>+</button>
      </div>
    </div>
  );
}

export default Sidebar;
