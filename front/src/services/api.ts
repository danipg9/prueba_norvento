import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id: number;
  nombre: string;
  email: string;
  password: string;
}

export interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: 'pendiente' | 'en progreso' | 'completada';
  usuarioId: number;
}

export const register = async (nombre: string, email: string, password: string): Promise<User> => {
  const response = await api.post('/auth/register', { nombre, email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<string> => {
  const response = await api.post('/auth/login', { email, password });
  const token = response.data.accessToken;
  localStorage.setItem('token', token);
  return token;
};

export const createTask = async (titulo: string, descripcion: string): Promise<Task> => {
  const response = await api.post('/tareas', { titulo, descripcion });
  return response.data;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tareas');
  return response.data;
};

export const getTaskById = async (id: number): Promise<Task> => {
  const response = await api.get(`/tareas/${id}`);
  return response.data;
};

export const updateTask = async (
  id: number,
  titulo?: string,
  descripcion?: string,
  estado?: 'pendiente' | 'en progreso' | 'completada'
): Promise<Task> => {
  const response = await api.put(`/tareas/${id}`, { titulo, descripcion, estado });
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/tareas/${id}`);
};

export default api;