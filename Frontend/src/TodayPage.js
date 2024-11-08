import React from 'react';
 // Import the CSS file for TodayPage

function TodayPage({ tasks, title }) {
  return (
    <div className="main">
      <h2 className="title">{title}</h2>
      <br />
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <li key={task._id} className="task-item">
              <div className="task-name">{task.taskName}</div>
              <br />
              <div className="task-details">
                <br />
                <span className="task-due-date">Due: {task.due_date}</span>
                <span className="task-priority">{task.priority}</span>
                <span className="task-category">{task.category}</span>
              </div>
              <div className="task-description">{task.description}</div>
            </li>
          ))
        ) : (
          <li className="no-tasks">No tasks due today.</li>
        )}
      </ul>
    </div>
  );
}

export default TodayPage;