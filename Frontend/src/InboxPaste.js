import React from 'react';


function InboxPage({ tasks }) {
 return (
   <div className="inbox-page">
     <h2>Today</h2>
     <div className="task-list">
       {tasks.length > 0 ? (
         tasks.map((task, index) => (
           <div key={index} className={`task-item ${task.priority.toLowerCase()}`}>
             <input type="checkbox" />
             <div className="task-details">
               <span className="task-name">{task.name}</span>
               <span className="task-category">{task.category}</span>
             </div>
           </div>
         ))
       ) : (
         <p>No tasks available.</p>
       )}
     </div>
   </div>
 );
}


export default InboxPage;