import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';
import { Task } from '../services/api';

// Mock de la función deleteTask
jest.mock('../services/api', () => ({
  deleteTask: jest.fn(() => Promise.resolve()),
}));

describe('TaskList', () => {
  const mockTasks: Task[] = [
    { id: 1, titulo: 'Tarea 1', descripcion: 'Desc 1', estado: 'pendiente', usuarioId: 1 },
    { id: 2, titulo: 'Tarea 2', descripcion: 'Desc 2', estado: 'en progreso', usuarioId: 1 },
  ];
  const mockOnEdit = jest.fn();
  const mockOnTasksUpdated = jest.fn();

  it('renderiza la lista de tareas correctamente', () => {
    render(
      <TaskList tasks={mockTasks} onEdit={mockOnEdit} onTasksUpdated={mockOnTasksUpdated} />
    );

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Desc 1 - pendiente')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
    expect(screen.getByText('Desc 2 - en progreso')).toBeInTheDocument();
  });

  it('llama a onEdit cuando se hace clic en el botón de editar', () => {
    render(
      <TaskList tasks={mockTasks} onEdit={mockOnEdit} onTasksUpdated={mockOnTasksUpdated} />
    );

    const editButtons = screen.getAllByLabelText('edit');
    fireEvent.click(editButtons[0]);
    expect(mockOnEdit).toHaveBeenCalledWith(mockTasks[0]);
  });

  it('llama a deleteTask y onTasksUpdated cuando se elimina una tarea', async () => {
    render(
      <TaskList tasks={mockTasks} onEdit={mockOnEdit} onTasksUpdated={mockOnTasksUpdated} />
    );

    const deleteButtons = screen.getAllByLabelText('delete');
    fireEvent.click(deleteButtons[0]);
    await screen.findByText('Tarea 2'); // Espera a que la lista se actualice
    expect(require('../services/api').deleteTask).toHaveBeenCalledWith(1);
    expect(mockOnTasksUpdated).toHaveBeenCalled();
  });
});