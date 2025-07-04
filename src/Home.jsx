// src/Home.jsx
import React, { useState, useEffect } from 'react';
import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';

function Home({ user }) {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('incomplete');
  const [newTask, setNewTask] = useState('');
  const [deadline, setDeadline] = useState('');
  const [editId, setEditId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [name, setName] = useState(user.displayName || '');
  const [age, setAge] = useState(localStorage.getItem('age') || '22');
  const [editingProfile, setEditingProfile] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const addOrUpdateTodo = () => {
    if (!newTask.trim() || !deadline) return;
    const todoData = {
      id: editId || uuidv4(),
      text: newTask,
      status: 'incomplete',
      deadline
    };

    const updatedTodos = editId
      ? todos.map(todo => (todo.id === editId ? todoData : todo))
      : [todoData, ...todos];

    setTodos(updatedTodos);
    setNewTask('');
    setDeadline('');
    setEditId(null);
  };

  const changeStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'incomplete' ? 'completed' : 'incomplete';
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo)));
  };

  const editTodo = (todo) => {
    setNewTask(todo.text);
    setDeadline(todo.deadline);
    setEditId(todo.id);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const isExpiringSoon = (todo) => {
    const now = new Date();
    const timeLeft = new Date(todo.deadline) - now;
    return todo.status === 'incomplete' && timeLeft > 0 && timeLeft < 3600000;
  };

  const filteredTodos = todos.map(todo => {
    const now = new Date();
    if (todo.status === 'incomplete' && new Date(todo.deadline) < now) {
      return { ...todo, status: 'expired' };
    }
    return todo;
  }).filter((todo) => {
    switch (filter) {
      case 'incomplete': return todo.status === 'incomplete' && !isExpiringSoon(todo);
      case 'completed': return todo.status === 'completed';
      case 'expiringSoon': return isExpiringSoon(todo);
      case 'expired': return todo.status === 'expired';
      default: return true;
    }
  });

  const getBadgeColor = (status) => {
    switch (status) {
      case 'incomplete': return 'secondary';
      case 'completed': return 'success';
      case 'expired': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <div className={`min-vh-100 p-3 ${darkMode ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
      {/* Profile & Theme Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <div>
          <h4>👤 {editingProfile ? (
            <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          ) : name}</h4>
          <p className="mb-0">
            {editingProfile ? (
              <input className="form-control" value={age} onChange={(e) => setAge(e.target.value)} type="number" />
            ) : `Age: ${age}`}
            <br />Email: {user.email}
          </p>
        </div>
        <div className="d-flex gap-2 mt-2 mt-md-0">
          <button className="btn btn-outline-info" onClick={() => {
            if (editingProfile) {
              localStorage.setItem('age', age);
            }
            setEditingProfile(!editingProfile);
          }}>
            {editingProfile ? 'Save' : 'Edit Profile'}
          </button>
          <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {/* Task Form */}
      <div className={`card p-4 shadow-sm ${darkMode ? 'bg-secondary text-white' : ''}`}>
        <div className="row g-2">
          <div className="col-md-6">
            <input
              className="form-control"
              type="text"
              placeholder="Enter task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100" onClick={addOrUpdateTodo}>
              {editId ? 'Update' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="btn-group mt-4 w-100 flex-wrap justify-content-center">
        {['incomplete', 'completed', 'expiringSoon', 'expired'].map((key) => (
          <button
            key={key}
            className={`btn btn-outline-${getBadgeColor(key)} ${filter === key ? 'active' : ''}`}
            onClick={() => setFilter(key)}
          >
            {key === 'expiringSoon' ? 'Expiring Soon' : key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="row mt-4">
        {filteredTodos.length === 0 ? (
          <p className="text-muted text-center">No tasks found.</p>
        ) : (
          filteredTodos.map((todo) => (
            <div className="col-md-6 col-lg-4 mb-4" key={todo.id}>
              <div className={`card h-100 shadow-sm ${darkMode ? 'bg-dark text-white border-light' : ''}`}>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title d-flex justify-content-between align-items-center">
                    {todo.text}
                    <span className={`badge bg-${getBadgeColor(todo.status)}`}>{todo.status}</span>
                  </h5>
                  <p className="card-text small text-muted">Deadline: {new Date(todo.deadline).toLocaleString()}</p>
                  <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => changeStatus(todo.id, todo.status)}>✓</button>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => editTodo(todo)}>✏️</button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTodo(todo.id)}>🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;
