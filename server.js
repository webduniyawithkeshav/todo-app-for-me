const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'todos.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize todos file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

// Helper function to read todos
function readTodos() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper function to write todos
function writeTodos(todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

// API Routes

// GET all todos
app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// POST create a new todo
app.post('/api/todos', (req, res) => {
  const todos = readTodos();
  const { text, completed = false } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }

  const newTodo = {
    id: Date.now().toString(),
    text: text.trim(),
    completed,
    createdAt: new Date().toISOString()
  };

  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// PUT update a todo
app.put('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const { id } = req.params;
  const { text, completed } = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  if (text !== undefined) {
    todos[todoIndex].text = text.trim();
  }
  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }

  writeTodos(todos);
  res.json(todos[todoIndex]);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const todos = readTodos();
  const { id } = req.params;

  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(todoIndex, 1);
  writeTodos(todos);
  res.json({ message: 'Todo deleted successfully' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
