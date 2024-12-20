const express = require("express");
const cors = require("cors"); // Import cors
const app = express();
const port = 3000;

let tasks = [
  // Sample tasks (for demonstration)
  { id: 1, task: "Task 1", completed: false },
  { id: 2, task: "Task 2", completed: false },
];
let nextId = 3; // For generating new task IDs

app.use(cors()); // Enable CORS
app.use(express.json());

app.get("/tasks", (req, res) => {
  console.log("test");
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = req.body.task;
  console.log(newTask);
  if (newTask) {
    const task = { id: nextId, task: newTask, completed: false };
    tasks.push(task);
    nextId++;
    res.status(201).json(task);
  } else {
    res.status(400).json({ error: "Invalid task data." });
  }
});

app.patch("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true; // Mark task as completed
    res.status(200).json({ message: "Task completed." });
  } else {
    res.status(404).json({ error: "Task not found." });
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Task deleted." });
  } else {
    res.status(404).json({ error: "Task not found." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
