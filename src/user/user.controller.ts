import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
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
        if (!this.userService.isEmail(email)) {
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
    }
}
