import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task, TaskStatus } from './task.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('tareas')
@ApiBearerAuth() 
@Controller('tareas')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Crea una nueva tarea' })
  @ApiResponse({ status: 201, description: 'Tarea creada exitosamente' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'Tarea 1' },
        descripcion: { type: 'string', example: 'Descripción de la tarea' },
      },
    },
  })
  async create(
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
    @Req() request: any,
  ): Promise<Task> {
    const userId = request.user.sub;
    return this.tasksService.createTask(titulo, descripcion, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas las tareas del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de tareas' })
  async findAll(@Req() request: any): Promise<Task[]> {
    const userId = request.user.sub;
    return this.tasksService.findAllTasks(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea encontrada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  async findOne(@Param('id') id: string, @Req() request: any): Promise<Task> {
    const userId = request.user.sub;
    return this.tasksService.findTaskById(+id, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea actualizada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string', example: 'Tarea Actualizada' },
        descripcion: { type: 'string', example: 'Nueva descripción' },
        estado: { type: 'string', enum: Object.values(TaskStatus), example: 'en progreso' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body('titulo') titulo: string,
    @Body('descripcion') descripcion: string,
    @Body('estado') estado: TaskStatus,
    @Req() request: any,
  ): Promise<Task> {
    const userId = request.user.sub;
    return this.tasksService.updateTask(+id, userId, titulo, descripcion, estado);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina una tarea por ID' })
  @ApiResponse({ status: 200, description: 'Tarea eliminada' })
  @ApiResponse({ status: 404, description: 'Tarea no encontrada' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la tarea' })
  async delete(@Param('id') id: string, @Req() request: any): Promise<void> {
    const userId = request.user.sub;
    return this.tasksService.deleteTask(+id, userId);
  }
}