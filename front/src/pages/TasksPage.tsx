import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { getTasks, Task } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TasksPage: React.FC = () => {
  const { token, logout } = useAuth();
  const { tasks, setTasks } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchTasks();
    } else {
      navigate('/login'); // Redirige a /login si no hay token
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleSave = (savedTask: Task) => {
    setTasks((prev: Task[]) =>
      editingTask
        ? prev.map((t: Task) => (t.id === savedTask.id ? savedTask : t))
        : [...prev, savedTask]
    );
    setEditingTask(undefined);
    setShowForm(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingTask(undefined);
    setShowForm(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirige inmediatamente después de logout
  };

  if (!token) {
    return null; // No renderiza nada, la redirección ya está manejada por useEffect
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <h1>Tareas</h1>
        <Button variant="contained" onClick={() => setShowForm(true)}>
          Nueva Tarea
        </Button>
        <Button variant="outlined" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      {showForm && (
        <TaskForm taskToEdit={editingTask} onSave={handleSave} onCancel={handleCancel} />
      )}
      <TaskList tasks={tasks} onEdit={handleEdit} onTasksUpdated={fetchTasks} />
    </Box>
  );
};

export default TasksPage;