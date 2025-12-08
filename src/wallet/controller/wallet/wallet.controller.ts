import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import IWalletService from '../../interfaces/IWalletServices';
import type { Request, Response } from 'express';
import { WalletService } from '../../services/wallet/wallet.service';
import { UserGuard } from '../../../users/guard/users/users.guard';
import { AuthGuard } from '../../../auth/guard/auth/auth.guard';
import { WalletDTO } from '../../dto/wallet.dto';

@Controller('wallet')
export class WalletController {
    constructor(
        private readonly walletService: WalletService,
    ) {}
    @UseGuards(UserGuard)
    @Get()
    async getAllWallets(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.getAllWallets(req,res);
        } catch (error) {
            throw error;
        }
    }
    @UsePipes(new ValidationPipe({forbidNonWhitelisted: true, transform: true}))
    @UseGuards(AuthGuard)
    @Post()
    async createWallet(@Body() walletData: WalletDTO, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.createWallet(walletData, req, res);
        } catch (error) {
            throw error;
        }
    }
    @Post('deposit')
    async depositByID(@Body() depositData:any, req: Request, res: Response): Promise<any> {
        try {
            return await this.walletService.depositByID(depositData, req, res);
        } catch (error) {
            throw error;
        }
    }
    @Post('withdraw')
    async withdrawByID(withdrawData: any, req: Request, res: Response): Promise<any> {
        try {
            return await this.walletService.withdrawByID(withdrawData, req, res);
        } catch (error) {
            throw error;   
        }
    }
    @UseGuards(AuthGuard)
    @Get('user')
    async getWalletByUserID(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.getWalletByUserID(req, res);
        } catch (error) {
            throw error;
        }
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getWalletByID(@Param('id') id: any , @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.getWalletByID(id, req, res);
        } catch (error) {
            throw error;
        }
    }
    @Patch(':id')
    async updateWalletByID(@Param('id') id: any, @Body() updateData: any, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.updateWalletByID(id, updateData, req, res);
        } catch (error) {
            throw error;
        }
    }
    @Delete(':id')
    async deleteWalletByID(@Param('id') id: any, @Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            return await this.walletService.deleteWalletByID(id, req, res);
        } catch (error) {
            throw error;
        }
    }
}
