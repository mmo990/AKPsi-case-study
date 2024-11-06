import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import InboxPage from './InboxPage';
import NewTask from './NewTask';

function App() {
 const [tasks, setTasks] = useState([]);

 // Function to add a new task
 const addTask = (task) => {
   setTasks([...tasks, task]);
 };

 return (
   <Router>
     <div className="app-container">
       <Sidebar />
       <Routes>
         <Route path="/" element={<InboxPage tasks={tasks} />} />
         <Route path="/new-task" element={<NewTask addTask={addTask} />} />
       </Routes>
     </div>
   </Router>
 );
}

export default App;