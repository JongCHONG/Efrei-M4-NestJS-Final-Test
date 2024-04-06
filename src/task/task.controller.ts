import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.schema';
import { UserService } from '../user/user.service';

@Controller()
export class TaskController {
    constructor(
        private taskService: TaskService,
        private userService: UserService,
    ) {}

    @Post()
    async addTask(
        @Res() res: any,
        @Body('name') name: string,
        @Body('userId') userId: string,
        @Body('priority') priority: number,
    ): Promise<Task> {
        try {
            if (!name || !userId || priority <= 0) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid task data',
                });
            }

            await this.taskService.addTask(name, userId, priority);
            return res.status(HttpStatus.CREATED).json({
                message: 'Task created successfully',
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while creating the task',
                error,
            });
        }
    }

    @Get()
    async getTaskByName(
        @Res() res: any,
        @Body('name') name: string,
    ): Promise<Task> {
        try {
            const payload = await this.taskService.getTaskByName(name);
            if (!payload) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'Task not found',
                    payload,
                });
            }
            return res.status(HttpStatus.OK).json(payload);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while retrieving the task',
                error,
            });
        }
    }

    @Get('user/:userId')
    async getUserTasks(
        @Res() res: any,
        @Param('userId') userId: string,
    ): Promise<Task[]> {
        try {
            await this.userService.getUserById(userId);

            const response = await this.taskService.getUserTasks(userId);

            const tasksWithIdInsteadOf_Id =
                this.mapTasksWithIdInsteadOf_Id(response);
            return res.status(HttpStatus.OK).json(tasksWithIdInsteadOf_Id);
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Invalid user id',
                error,
            });
        }
    }

    private mapTasksWithIdInsteadOf_Id(tasks: any[]): any[] {
        return tasks.map((task) => {
            return {
                id: task._id,
                name: task.name,
                userId: task.userId,
                priority: task.priority,
                __v: task.__v,
            };
        });
    }
}
