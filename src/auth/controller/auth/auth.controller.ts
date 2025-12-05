import { Body, Controller, Get, Param, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { RegisterDTO } from '../../dto/register.dto';
import { LoginDTO } from '../../dto/login.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from '../../guard/auth/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServices: AuthService
    ) {}
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @Post("register")
    async register(@Body() registerData: RegisterDTO, @Req() req: Request, @Res() res: Response) {
        return await this.authServices.register(registerData, req, res);
    }
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @Post("login")
    async login(@Body() loginData: LoginDTO, @Req() req: Request, @Res() res: Response) {
        return await this.authServices.login(loginData, req, res);
    }
    @UseGuards(AuthGuard)
    @Post("reset-password/:token")
    async resetPassword(@Param('token')token: any, @Req() req: Request, @Res() res: Response){
        return await this.authServices.resetPassword(token, req, res)
    }
    @UseGuards(AuthGuard)
    @Post("forgot-password")
    async forgotPassword(@Req() req: Request, @Res() res: Response){
        return await this.authServices.forgotPassword(req, res);
    }
    @UseGuards(AuthGuard)
    @Get("logout")
    async logout(@Res() res: Response) {
        return await this.authServices.logout(res)
    }
}
