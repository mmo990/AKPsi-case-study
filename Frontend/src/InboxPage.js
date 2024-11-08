import React from 'react';
import './App.css'; // Ensure App.css is imported

function InboxPage({ tasks, title }) {
  console.log('Tasks in InboxPage:', tasks); // Add this line

  // Helper function to get the week dates for the Inbox page
  const getWeekDates = () => {
    const today = new Date();
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      weekDates.push({
        date: nextDate.getDate(),
        fullDate: nextDate.toISOString().split('T')[0], // Add fullDate for accurate comparison
        day: nextDate.toLocaleString('default', { weekday: 'long' }),
      });
    }

    return weekDates;
  };

  const weekDates = getWeekDates();

  return (
    <div className="inbox">
      <h2 className="inbox-title">{title}</h2>
      {title === "Inbox" ? (
        weekDates.map(({ date, fullDate, day }) => (
          <div key={date} className="week-day">
            <h3 className="day-heading">
              {day} ({date})
            </h3>
            <div className="task-list">
              {tasks.filter(task => task.due_date === fullDate).length > 0 ? (
                tasks.filter(task => task.due_date === fullDate).map(task => (
                  <div key={task._id} className="task-item">
                    <div className="task-name">{task.taskName}</div>
                    <div className="task-details">
                      <span className="task-due-date">Due: {task.due_date}</span>
                      <span className="task-priority">{task.priority}</span>
                      <span className="task-category">{task.category}</span>
                    </div>
                    <div className="task-description"><b>Description: </b> {task.description}</div>
                  </div>
                ))
              ) : (
                <div className="no-tasks">No tasks for this day.</div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="task-list">
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className="task-item">
                <div className="task-name">{task.taskName}</div>
                <div className="task-details">
                  <span className="task-due-date">Due: {task.due_date}</span>
                  <span className="task-priority">{task.priority}</span>
                  <span className="task-category">{task.category}</span>
                </div>
                <div className="task-description">{task.description}</div>
              </div>
            ))
          ) : (
            <div className="no-tasks">No tasks available.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default InboxPage;