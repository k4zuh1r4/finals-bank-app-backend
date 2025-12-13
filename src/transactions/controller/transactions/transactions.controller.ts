import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import TransactionService from '../../interface/ITransactionService';
import type { Request, Response } from 'express';
import { TransactionDTO } from '../../dto/transaction.dto';
import { TransactionsService } from '../../services/transactions/transactions.service';
import { UserGuard } from '../../../users/guard/users/users.guard';
import { AuthGuard } from '../../../auth/guard/auth/auth.guard';

@Controller('transactions')
export class TransactionsController {
    constructor(
         private readonly transactionService: TransactionsService
    ) {}

    @UseGuards(UserGuard)
    @Get()
    async getAllTransactions(@Req() req: Request, @Res() res: Response) {
        try {
            return this.transactionService.getAllTransactions(req, res);
        } catch (error) {
            throw error;
        }
    }
    @UseGuards(AuthGuard)
    @Post()
    async createTransaction(@Body() transactionData: TransactionDTO, @Req() req: Request, @Res() res: Response) {
        try {
            return this.transactionService.createTransaction(transactionData, req, res);
        } catch (error) {
            throw error;
        }
    }
    @UseGuards(AuthGuard)
    @Get('/user')
    async getTransactionsByUserID(@Req() req: Request, @Res() res: Response) {
        try {
            return this.transactionService.getTransactionsByUserID(req, res);
        } catch (error) {
            throw error;
        }
    }
    @UseGuards(AuthGuard)
    @Get(':id')
    async getTransactionsByID(@Param('id')id: any, @Req() req: Request, @Res() res: Response) {
        try {
            return this.transactionService.getTransactionsByID(id, req, res);
        } catch (error) {
            throw error;
        }
    }
}
