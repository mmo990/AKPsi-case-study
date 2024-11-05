import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function NewTask({ addTask }) {
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');
   const [priority, setPriority] = useState('Priority 1');
   const [category, setCategory] = useState('Work');
   const navigate = useNavigate();
    const handleSubmit = (e) => {
     e.preventDefault();
      if (name) {
       const task = {
         name,
         description,
         priority,
         category,
         date: new Date().toLocaleDateString(), // For demo purposes, we use the current date
       };
       addTask(task); // Add the task to the main task list
       navigate('/'); // Redirect to inbox after adding task
     }
   };
    return (
     <div className="main">
       <h2 className="title">New Task</h2>
       <form className="task-form" onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder="Task name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
         />
         <textarea
           placeholder="Description"
           value={description}
           onChange={(e) => setDescription(e.target.value)}
         ></textarea>
         <div className="task-options">
           <div className="due-date">
             <label>Due Date</label>
             <button type="button" onClick={() => alert('Set due date to Today')}>Today</button>
             <button type="button" onClick={() => alert('Set due date to Tomorrow')}>Tomorrow</button>
             <button type="button" onClick={() => alert('Set due date to Next Week')}>Next Week</button>
           </div>
           <div className="dropdown">
             <label>Priority</label>
             <select value={priority} onChange={(e) => setPriority(e.target.value)}>
               <option>Priority 1</option>
               <option>Priority 2</option>
             </select>
           </div>
           <div className="dropdown">
             <label>Categories</label>
             <select value={category} onChange={(e) => setCategory(e.target.value)}>
               <option>Work</option>
               <option>Personal</option>
             </select>
           </div>
         </div>
         <button type="submit" className="submit-btn">Add Task</button>
       </form>
     </div>
   );
 }
  export default NewTask;
