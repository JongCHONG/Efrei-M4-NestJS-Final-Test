import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    async addUser(
        @Res() res: any,
        @Body('email') email: string,
    ): Promise<User> {
        try {
            const response = await this.userService.addUser(email);

            return res.status(HttpStatus.CREATED).json({
                response,
                message: 'User created successfully',
            });
        } catch (error) {
            return res.status(error.status).json({
                message: error.message,
            });
        }
    }

    @Get()
    async getUser(
        @Res() res: any,
        @Body('email') email: string,
    ): Promise<User> {
        try {
            const user = await this.userService.getUser(email);

            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(error.status).json({
                message: error.message,
            });
        }
    }

    @Get('/id/:userId')
    async getUserById(
        @Res() res: any,
        @Param('userId') userId: string,
    ): Promise<User> {
        try {
            const user = await this.userService.getUserById(userId);

            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.NOT_FOUND).json({
                message: 'User not found',
            });
        }
    }
}
