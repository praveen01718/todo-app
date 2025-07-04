// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
});

// POST new todo
router.post('/', async (req, res) => {
  const { text, status, deadline } = req.body;
  const todo = new Todo({ text, status, deadline });
  await todo.save();
  res.status(201).json(todo);
});

// PUT update todo
router.put('/:id', async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
