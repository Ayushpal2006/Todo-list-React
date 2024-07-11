import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(["Go to gym", "Go to walk", "Eat"]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      const Todo = JSON.parse(localStorage.getItem("tasks"));
      setTasks(Todo);
    }
  }, []);

  var saveToLocalStorage = (params) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      // Ensure newTask is not empty
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear input after adding task
    }
    saveToLocalStorage();
  };

  const handleChange = (e) => {
    setNewTask(e.target.value); // Update newTask state with input value
    saveToLocalStorage();
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((element, i) => i !== index);
    setTasks(updatedTasks);
    saveToLocalStorage();
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index - 1]] = [
      updatedTasks[index - 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
    saveToLocalStorage();
  };

  const moveDown = (index) => {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index],
    ];
    setTasks(updatedTasks);
    saveToLocalStorage();
  };

  return (
    <>
      <div className="todo">
        <h1>Todo List</h1>
      </div>

      <div className="input">
        <input
          placeholder="Enter the todo"
          value={newTask}
          onChange={handleChange} // Corrected onChange handler
          type="text"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="show">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <span>{task}</span>
              <button onClick={() => {handleDelete(index);}}>Delete</button>

              <button onClick={() => {moveUp(index);}}>👍</button>
              
              <button onClick={() => {moveDown(index);}}>👎</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
