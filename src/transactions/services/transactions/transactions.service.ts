import { Injectable, Logger } from '@nestjs/common';
import ITransactionService from '../../interface/ITransactionService';
import { Request, Response } from 'express';
import { TransactionDTO } from '../../dto/transaction.dto';
import GetAllTransactionService from '../../use-cases/GetAllTransactions';
import CreateTransactionsService from '../../use-cases/CreateTransactions';
import GetTransactionsByUserIDService from '../../use-cases/GetTransactionsByUserID';
import GetTransactionsByIDService from '../../use-cases/GetTransactionsByID';

@Injectable()
export class TransactionsService implements ITransactionService {
    private readonly logger = new Logger(TransactionsService.name);
    constructor(
        private readonly getAllTransactionService: GetAllTransactionService,
        private readonly createTransactionService: CreateTransactionsService,
        private readonly getTransactionsByUserIDService: GetTransactionsByUserIDService,
        private readonly getTransactionsByIDService: GetTransactionsByIDService,
    ) {}
    async getAllTransactions(req: Request, res: Response): Promise<any> {
        try {
            return await this.getAllTransactionService.execute(req, res);
        } catch (error) {
            throw error;
        }
    }
    async getTransactionsByID(id: any, req: Request, res: Response): Promise<any> {
        try {
            return await this.getTransactionsByIDService.execute(id, req, res);
        } catch (error) {
            throw error;
        }
    }
    async createTransaction(transactionData: TransactionDTO, req: Request, res: Response): Promise<any> {
        try {
            return await this.createTransactionService.execute(transactionData, req, res);
        } catch (error) {
            throw error;
        }
    }
    async getTransactionsByUserID(req: Request, res: Response): Promise<any> {
        try {
            return await this.getTransactionsByUserIDService.execute(req, res);
        } catch (error) {
            throw error;
        }
    }
}
