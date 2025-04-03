import React from 'react';
import { Task, deleteTask } from '../services/api';
import TaskItem from './TaskItem';
import { List, Typography } from '@mui/material';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onTasksUpdated: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onTasksUpdated }) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      onTasksUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (tasks.length === 0) {
    return <Typography>No hay tareas disponibles</Typography>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      ))}
    </List>
  );
};

export default TaskList;