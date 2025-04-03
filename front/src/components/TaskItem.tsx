import React from 'react';
import { Task } from '../services/api';
import { ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton aria-label="edit" edge="end" onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" edge="end" onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={task.titulo} secondary={`${task.descripcion} - ${task.estado}`} />
    </ListItem>
  );
};

export default TaskItem;