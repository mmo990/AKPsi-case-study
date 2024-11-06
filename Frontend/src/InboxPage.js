import React from 'react';

function InboxPage({ tasks, title }) {
  // Helper function to get the week dates for the Inbox page
  const getWeekDates = () => {
    const today = new Date();
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);
      weekDates.push({
        date: nextDate.getDate(),
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
        weekDates.map(({ date, day }) => (
          <div key={date} className="week-day">
            <h3 className="day-heading">
              {day} ({date})
            </h3>
            <div className="task-list">
              {tasks.filter(task => task.date === date).length > 0 ? (
                tasks
                  .filter(task => task.date === date)
                  .map((task, index) => {
                    const taskText = task?.text || 'Untitled Task';
                    const colorLabel = task.color === 'orange' ? 'Work' : 'Personal';
                    return (
                      <div key={index} className="task">
                        <p className="task-text">{taskText}</p>
                        <p className="task-date">Due Date: {date}</p>
                        <p className="task-category" style={{ color: task.color }}>{colorLabel}</p>
                      </div>
                    );
                  })
              ) : (
                <p className="no-tasks">No tasks available for this day.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <>
          {tasks.filter(task => task.date === new Date().getDate()).length > 0 ? (
            tasks
              .filter(task => task.date === new Date().getDate())
              .map((task, index) => {
                const taskText = task?.text || 'Untitled Task';
                const colorLabel = task.color === 'orange' ? 'Work' : 'Personal';
                return (
                  <div key={index} className="task">
                    <p className="task-text">{taskText}</p>
                    <p className="task-date">Due Date: {new Date().getDate()}</p>
                    <p className="task-category" style={{ color: task.color }}>{colorLabel}</p>
                  </div>
                );
              })
          ) : (
            <p className="no-tasks">No tasks available for today.</p>
          )}
        </>
      )}
    </div>
  );
}

export default InboxPage;
