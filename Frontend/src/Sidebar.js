  import React from "react";
  function Sidebar()
  {
    return (
        <div className = "sidebar">
            <div className="logo">
                <span className = "logo-icon">📅</span>
                <h2> TO - DO </h2>
            </div>
            <u1 className = "menu">
                <li>Inbox</li>
                <li>Today</li>
                <li>Calendar (Month View)</li>
            </u1>
            <br />
            <div className = "dropdown-heading">
                Categories
            </div>
            <u1 className = "category-list">
                <li className="category-item">
                    <span className = "category-color work"></span> Work <span className = "badge"> 2</span>
                </li>
                <li className="category-item">
                    <span className = "category-color work"></span> Personal <span className = "badge"> 5</span>
                </li>
            </u1>
            <br />
            <div className = "dropdown-heading">
                Priority
            </div>
            <u1 className = "priority-list">
                <li>Priority 1 <span className = "badge"> 1</span></li>
                <li>Priority 2 <span className = "badge"> 1</span></li>
            </u1>
        </div>
    );
  }


  export default Sidebar;