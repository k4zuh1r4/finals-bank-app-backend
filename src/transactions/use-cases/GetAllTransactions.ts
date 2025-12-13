import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "../entity/transactions.entity";
import { Request, Response } from "express";

export default class GetAllTransactionService {
    private readonly logger = new Logger(GetAllTransactionService.name);
    constructor(
        @InjectRepository(Transaction)
        private readonly walletRepository: Repository<Transaction>,
    ) {}
    async execute(req: Request, res: Response) {
        try {
            this.logger.debug(`Getting all transactions.`);
            const result = await this.walletRepository.find()
            return res.status(200).json({
                message: "Retrieved all transactions successfully.",
                result
            })
        } catch (error) {
            this.logger.error(`Error depositing.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}