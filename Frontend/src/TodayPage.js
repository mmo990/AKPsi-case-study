import React from 'react';

const TodayPage = ({ tasks }) => {
  const today = new Date().getDate();

  // Filter tasks for today
  const todayTasks = tasks.filter(task => task.date === today);

  return (
    <div className="today">
      <h2>Today</h2>
      {todayTasks.length > 0 ? (
        todayTasks.map((task, index) => (
          <div key={index} className="task">
            <p>{task.text}</p>
            <p>Due Date: {task.date}</p>
            <p style={{ color: task.color }}>{task.color}</p>
          </div>
        ))
      ) : (
        <p>No tasks for today.</p>
      )}
    </div>
  );
};

export default TodayPage;
