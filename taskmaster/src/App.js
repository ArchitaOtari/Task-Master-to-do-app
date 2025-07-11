import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTime, setNewTime] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddTask = () => {
    if (newTask.trim() === "" || newTime.trim() === "") return;

    const task = {
      id: Date.now(),
      text: newTask,
      time: newTime,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    setNewTime("");
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getToday = () => {
    const now = new Date();
    const weekday = now.toLocaleDateString(undefined, { weekday: "long" });
    const day = now.getDate();
    
    // Add suffix like 1st, 2nd, 3rd, etc.
    const getDaySuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
  
    const suffix = getDaySuffix(day);
    return `${weekday} ${day}${suffix}`;
  };
  

  return (
    <div className="content">
      <div className="title-box">To-do List 📝</div>
      <div className="card">
        <div className="header">
          <div>
            <h2>{getToday()}</h2>
            <p>{new Date().toLocaleString('default', { month: 'long' })}</p>

          </div>
          <div className="task-count">{tasks.length} Tasks</div>
          <button className="add-btn" onClick={() => setModalOpen(true)}>
            +
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggle(task.id)}
              />
              <span>{task.text}</span>
              <div className="time">{task.time}</div>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Task</h3>
            <input
              type="text"
              placeholder="Task description"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
