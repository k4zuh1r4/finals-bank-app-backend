import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import type { Request, Response } from 'express';
import { UserGuard } from '../../guard/users/users.guard';
import { AuthGuard } from '../../../auth/guard/auth/auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServices: UsersService,
    ) {}
    @UseGuards(UserGuard)
    @Get()
    async getAllUsers(@Res() res: Response) {
        const result = await this.userServices.getAllUsers(res);
        return result
    }
    @UseGuards(UserGuard)
    @Post()
    async createUser(@Body() userData: any, @Res() res: Response) {
        return await this.userServices.createUser(userData, res);
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserByID(@Param('id') id: any, @Req() req: Request, @Res() res: Response) {
        return await this.userServices.getUserByID(id, req, res);
    }
    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(@Param('id') id: any, @Body() patchData: any, @Req() req: Request, @Res() res: Response) {
        return await this.userServices.updateUser(id, patchData, req, res);
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(@Param('id') id: any, @Req() req: Request, @Res() res: Response ) {
        return await this.userServices.deleteUser(id, req, res);
    }
}
