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
      <h2>{title}</h2>
      {title === "Inbox" ? (
        weekDates.map(({ date, day }) => (
          <div key={date} className="week-day">
            <h3>{day} ({date})</h3>
            {tasks.filter(task => task.date === date).length > 0 ? (
              tasks
                .filter(task => task.date === date)
                .map((task, index) => {
                  const taskText = task?.text || 'Untitled Task'; // Default to 'Untitled Task' if text is undefined
                  const colorLabel = task.color === 'orange' ? 'Work' : 'Personal'; // Determine color label
                  return (
                    <div key={index} className="task">
                      <p>{taskText.toLowerCase()}</p>
                      <p>Due Date: {date}</p>
                      <p style={{ color: task.color }}>{colorLabel}</p>
                    </div>
                  );
                })
            ) : (
              <p>No tasks available for this day.</p>
            )}
          </div>
        ))
      ) : (
        // Display today's tasks only when the title is "Today's Tasks"
        <>
          {tasks.filter(task => task.date === new Date().getDate()).length > 0 ? (
            tasks
              .filter(task => task.date === new Date().getDate())
              .map((task, index) => {
                const taskText = task?.text || 'Untitled Task'; // Default to 'Untitled Task' if text is undefined
                const colorLabel = task.color === 'orange' ? 'Work' : 'Personal'; // Determine color label
                return (
                  <div key={index} className="task">
                    <p>{taskText.toLowerCase()}</p>
                    <p>Due Date: {new Date().getDate()}</p>
                    <p style={{ color: task.color }}>{colorLabel}</p>
                  </div>
                );
              })
          ) : (
            <p>No tasks available for today.</p>
          )}
        </>
      )}
    </div>
  );
}

export default InboxPage;
