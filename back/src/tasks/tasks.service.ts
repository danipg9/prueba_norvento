import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async createTask(
    titulo: string,
    descripcion: string,
    userId: number,
  ): Promise<Task> {
    const user = await this.usersService.findById(userId);
    const task = this.taskRepository.create({
      titulo,
      descripcion,
      estado: TaskStatus.PENDIENTE,
      usuarioId: user.id,
    });
    return this.taskRepository.save(task);
  }

  async findAllTasks(userId: number): Promise<Task[]> {
    return this.taskRepository.find({ where: { usuarioId: userId } });
  }

  async findTaskById(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id, usuarioId: userId } });
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    }
    return task;
  }

  async updateTask(
    id: number,
    userId: number,
    titulo?: string,
    descripcion?: string,
    estado?: TaskStatus,
  ): Promise<Task> {
    const task = await this.findTaskById(id, userId);
    if (titulo) task.titulo = titulo;
    if (descripcion) task.descripcion = descripcion;
    if (estado) task.estado = estado;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: number, userId: number): Promise<void> {
    const task = await this.findTaskById(id, userId);
    await this.taskRepository.remove(task);
  }
}