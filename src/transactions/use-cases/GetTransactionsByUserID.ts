import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "../entity/transactions.entity";
import { In, Repository } from "typeorm";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { Request, Response } from "express";

export default class GetTransactionsByUserIDService {
    private readonly logger = new Logger(GetTransactionsByUserIDService.name)
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>
    ) {}
    async execute(req: Request, res: Response) {
        try {
            const userID = req.user?.id
            this.logger.debug("Finding wallet list for user's ID.");
            const walletList = await this.walletRepository.find({where: {userID: userID}});
            if (!walletList) {
                this.logger.error("Failed to find any wallet under this user's ID.")
                return res.status(404).json({
                    message: "Failed to find any wallet under this user's ID."
                });
            }
            const walletIDs = walletList.map(wallet => wallet.id);
            const result = await this.transactionRepository.find({
                where: [
                    {senderID: In(walletIDs)},
                    {receiverID: In(walletIDs)}
                ]
            });
            return res.status(200).json({
                message: "Transactions retrieved.",
                result
            })
        } catch (error) {
            this.logger.error(`Error getting transactions.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}