import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task, TaskStatus } from './task.entity';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from '../users/user.entity';

describe('TasksService', () => {
  let service: TasksService;
  let taskRepository: Repository<Task>;
  let usersService: UsersService;

  const mockUser: User = {
    id: 1,
    nombre: 'Test User',
    email: 'test@example.com',
    password: 'hashed',
    tasks: [],
  };
  const mockTask: Task = {
    id: 1,
    titulo: 'Tarea 1',
    descripcion: 'Descripción',
    estado: TaskStatus.PENDIENTE,
    usuarioId: 1,
    user: mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
        {
          provide: UsersService,
          useValue: {
            findById: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    taskRepository = module.get<Repository<Task>>(getRepositoryToken(Task));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      jest.spyOn(taskRepository, 'create').mockReturnValue(mockTask);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask);
      const result = await service.createTask('Tarea 1', 'Descripción', 1);
      expect(result).toEqual(mockTask);
      expect(taskRepository.create).toHaveBeenCalledWith({
        titulo: 'Tarea 1',
        descripcion: 'Descripción',
        estado: TaskStatus.PENDIENTE,
        usuarioId: 1,
      });
    });
  });

  describe('findAllTasks', () => {
    it('should return an array of tasks', async () => {
      jest.spyOn(taskRepository, 'find').mockResolvedValue([mockTask]);
      const result = await service.findAllTasks(1);
      expect(result).toEqual([mockTask]);
      expect(taskRepository.find).toHaveBeenCalledWith({ where: { usuarioId: 1 } });
    });
  });

  describe('findTaskById', () => {
    it('should return a task', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(mockTask);
      const result = await service.findTaskById(1, 1);
      expect(result).toEqual(mockTask);
    });

    it('should throw NotFoundException if task not found', async () => {
      jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
      await expect(service.findTaskById(999, 1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      jest.spyOn(service, 'findTaskById').mockResolvedValue(mockTask);
      jest.spyOn(taskRepository, 'save').mockResolvedValue({
        ...mockTask,
        titulo: 'Tarea Actualizada',
      });
      const result = await service.updateTask(1, 1, 'Tarea Actualizada');
      expect(result.titulo).toBe('Tarea Actualizada');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      jest.spyOn(service, 'findTaskById').mockResolvedValue(mockTask);
      jest.spyOn(taskRepository, 'remove').mockResolvedValue(mockTask as any); // Casteo para evitar problemas menores
      await service.deleteTask(1, 1);
      expect(taskRepository.remove).toHaveBeenCalledWith(mockTask);
    });
  });
});