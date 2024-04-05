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

@Controller()
export class TaskController {
    constructor(private taskService: TaskService) {}

    @Post()
    async addTask(
        @Res() res: any,
        @Body('name') name: string,
        @Body('userId') userId: string,
        @Body('priority') priority: number,
    ): Promise<Task> {
        await this.taskService.addTask(name, userId, priority);
        return res.status(HttpStatus.CREATED).json({
            message: 'Task created successfully',
        });
    }

    @Get()
    async getTaskByName(
        @Res() res: any,
        @Body('name') name: string,
    ): Promise<Task> {
        const payload = await this.taskService.getTaskByName(name);
        if (!payload) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'Task not found',
            });
        }
        return res.status(HttpStatus.OK).json(payload);
    }

    @Get('user/:userId')
    async getUserTasks(@Param('userId') userId: string): Promise<unknown> {
        const payload = await this.taskService.getUserTasks(userId);        
        return payload;
    }
}
