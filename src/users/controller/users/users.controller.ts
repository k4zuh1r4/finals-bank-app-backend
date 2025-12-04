import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service';
import type { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServices: UsersService,
    ) {}
    @Get()
    async getAllUsers(@Res() res: Response) {
        const result = await this.userServices.getAllUsers(res);
        return result
    }
    @Post()
    async createUser(@Body() userData: any, @Res() res: Response){
        return await this.userServices.createUser(userData, res);
    }
    @Get(':id')
    async getUserByID(@Param('id') id: any, @Res() res: Response) {
        return await this.userServices.getUserByID(id, res);
    }
    @Patch(':id')
    async updateUser(@Param('id') id: any, @Body() patchData: any) {
        return await this.userServices.updateUser(id, patchData);
    }
    @Delete(':id')
    async deleteUser(@Param('id') id: any, @Res() res: Response ) {
        return await this.userServices.deleteUser(id);
    }
}
