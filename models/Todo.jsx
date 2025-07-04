// models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  status: { type: String, default: 'incomplete' },
  deadline: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
