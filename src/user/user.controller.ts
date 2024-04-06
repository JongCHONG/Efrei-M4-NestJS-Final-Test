import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
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
            if (!this.isEmail(email)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid email',
                });
            }

            const existingUser = await this.userService.getUser(email);
            if (existingUser) {
                return res.status(HttpStatus.CONFLICT).json({
                    message: 'User already exists',
                });
            }

            await this.userService.addUser(email);
            return res.status(HttpStatus.CREATED).json({
                message: 'User created successfully',
            });
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred',
            });
        }
    }

    @Get()
    async getUser(
        @Res() res: any,
        @Body('email') email: string,
    ): Promise<User> {
        try {
            if (!this.isEmail(email)) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    message: 'Invalid email',
                });
            }

            const user = await this.userService.getUser(email);
            if (!user) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: 'User not found',
                });
            }

            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred',
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

    private isEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
