import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

jest.mock('./services/api', () => ({
  login: jest.fn(),
  register: jest.fn(),
  getTasks: jest.fn(() => Promise.resolve([])),
}));

test('renders login page by default', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <App />
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
  const loginText = screen.getByText(/Iniciar Sesión/i);
  expect(loginText).toBeInTheDocument();
});