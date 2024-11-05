import React from 'react';

function InboxPage({ tasks, title }) {
  return (
    <div className="inbox">
      <h2>{title}</h2> {/* Dynamically render the title */}
      {tasks && tasks.length > 0 ? (
        tasks.map((task, index) => {
          const taskText = task?.text || 'Untitled Task'; // Default to 'Untitled Task' if text is undefined
          return (
            <div key={index} className="task">
              <p>{taskText.toLowerCase()}</p>
              <p>Due Date: {task.date}</p>
              <p style={{ color: task.color }}>{task.color}</p>
            </div>
          );
        })
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
}

export default InboxPage;
