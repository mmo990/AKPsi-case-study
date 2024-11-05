import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">📅</span>
        <h2>TO - DO</h2>
      </div>

      {/* Menu Buttons */}
      <ul className="menu">
        <li>
          <button onClick={() => navigate('/')} className="menu-button">Today</button>
        </li>
        <li>
          <button onClick={() => navigate('/new-task')} className="menu-button">New Task</button>
        </li>
        <li>
          <button onClick={() => navigate('/inbox')} className="menu-button">Inbox</button>
        </li>
        <li>
          <button onClick={() => navigate('/calendar')} className="menu-button">Calendar (Month View)</button>
        </li>
      </ul>

      <div className="dropdown-heading">
        Categories
      </div>

      {/* Categories List */}
      <ul className="category-list">
        <li className="category-item">
          <span className="category-color work"></span> Work <span className="badge">2</span>
        </li>
        <li className="category-item">
          <span className="category-color personal"></span> Personal <span className="badge">5</span>
        </li>
      </ul>

      <div className="dropdown-heading">
        Priority
      </div>

      {/* Priority List */}
      <ul className="priority-list">
        <li>Priority 1 <span className="badge">1</span></li>
        <li>Priority 2 <span className="badge">1</span></li>
      </ul>
    </div>
  );
}

export default Sidebar;
