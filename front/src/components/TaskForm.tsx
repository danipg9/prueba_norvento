import React, { useState, useEffect } from 'react';
import { Task, createTask, updateTask } from '../services/api';
import { Button, TextField, Box, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, Typography } from '@mui/material';

interface TaskFormProps {
  taskToEdit?: Task;
  onSave: (task: Task) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onSave, onCancel }) => {
  const [titulo, setTitulo] = useState(taskToEdit?.titulo || '');
  const [descripcion, setDescripcion] = useState(taskToEdit?.descripcion || '');
  const [estado, setEstado] = useState<'pendiente' | 'en progreso' | 'completada'>(
    taskToEdit?.estado || 'pendiente'
  );
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setDescripcion(taskToEdit.descripcion);
      setEstado(taskToEdit.estado);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }
    setError(''); // Limpia el error si pasa la validación
    try {
      let savedTask: Task;
      if (taskToEdit) {
        savedTask = await updateTask(taskToEdit.id, titulo, descripcion, estado);
      } else {
        savedTask = await createTask(titulo, descripcion);
      }
      onSave(savedTask);
      setTitulo('');
      setDescripcion('');
      setEstado('pendiente');
    } catch (error) {
      setError('Error al guardar la tarea');
      console.error('Error saving task:', error);
    }
  };

  const handleEstadoChange = (e: SelectChangeEvent<'pendiente' | 'en progreso' | 'completada'>) => {
    setEstado(e.target.value as 'pendiente' | 'en progreso' | 'completada');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 2 }}>
      <TextField
        label="Título"
        value={titulo}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitulo(e.target.value)}
        fullWidth
        margin="normal"
        error={!!error && !titulo.trim()} // Resalta el campo si hay error
        helperText={error && !titulo.trim() ? error : ''} // Muestra el mensaje de error
      />
      <TextField
        label="Descripción"
        value={descripcion}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescripcion(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Estado</InputLabel>
        <Select value={estado} onChange={handleEstadoChange}>
          <MenuItem value="pendiente">Pendiente</MenuItem>
          <MenuItem value="en progreso">En progreso</MenuItem>
          <MenuItem value="completada">Completada</MenuItem>
        </Select>
      </FormControl>
      {error && titulo.trim() && <Typography color="error">{error}</Typography>} {/* Error general */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained">
          {taskToEdit ? 'Actualizar' : 'Crear'}
        </Button>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;