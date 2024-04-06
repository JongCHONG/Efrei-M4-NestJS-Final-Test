import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {}

    async addUser(email: string): Promise<User> {
        const newUser = new this.userModel({ email });
        return newUser.save();
    }

    async getUser(email: string): Promise<User> {
        return await this.userModel.findOne({ email });
    }

    async getUserById(userId: string): Promise<User> {        
        return await this.userModel.findById(userId);
    }

    async resetData() {
        await this.userModel.deleteMany({});
    }
}
