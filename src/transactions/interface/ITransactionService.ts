import { Request, Response } from "express";
import { TransactionDTO } from "../dto/transaction.dto";

export default interface ITransactionService {
    getAllTransactions(req: Request, res: Response): Promise<any>;
    getTransactionsByID(id: any, req: Request, res: Response): Promise<any>;
    createTransaction(transactionData: TransactionDTO, req: Request, res: Response): Promise<any>;
    getTransactionsByUserID(req: Request, res: Response): Promise<any>;
}