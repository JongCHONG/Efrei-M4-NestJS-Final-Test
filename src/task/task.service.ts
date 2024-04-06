import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    ) {}

    async addTask(
        name: string,
        userId: string,
        priority: number,
    ): Promise<Task> {
        const newTask = new this.taskModel({ name, userId, priority });
        return newTask.save();
    }

    async getTaskByName(name: string): Promise<Task> {
        return await this.taskModel.findOne({ name }).exec();
    }

    async getUserTasks(userId: string): Promise<Task[]> {
        return await this.taskModel.find({ userId }).exec();
    }

    async resetData() {
        await this.taskModel.deleteMany({});
    }
}
