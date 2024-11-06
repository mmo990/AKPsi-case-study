import React from "react";
import { Link } from "react-router-dom";

function Sidebar({ categories }) {
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
            <span className={`category-color ${category.name.toLowerCase()}`}></span> {category.name} <span className="badge"> {category.count || 0}</span>
          </li>
        ))}
      </ul>
      <br />
      <div className="dropdown-heading">Priority</div>
      <ul className="priority-list">
        <li>Priority 1 <span className="badge"> 1</span></li>
        <li>Priority 2 <span className="badge"> 1</span></li>
      </ul>
    </div>
  );
}

export default Sidebar;
