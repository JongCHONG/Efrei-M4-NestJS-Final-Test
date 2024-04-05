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
        const payload = await this.userModel.findOne({ email });
        
        return payload;
    }

    async resetData() {
        await this.userModel.deleteMany({});
    }

    isEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
