import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
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
        <li className="category-item">
          <span className="category-color work"></span> Work <span className="badge"> 2</span>
        </li>
        <li className="category-item">
          <span className="category-color work"></span> Personal <span className="badge"> 5</span>
        </li>
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
