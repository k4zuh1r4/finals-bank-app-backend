import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransactionDTO } from "../dto/transaction.dto";
import { Request, Response } from "express";
import { Wallet } from "../../wallet/entities/wallet.entity";
import { Transaction } from "../entity/transactions.entity";

export default class CreateTransactionsService {
    private readonly logger = new Logger(CreateTransactionsService.name);
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(transactionData: TransactionDTO, req: Request, res: Response) {
        try {
            this.logger.debug("Finding and validating sender wallet.")
            const senderWallet = await this.walletRepository.findOne({where: {
                userID: req.user?.id,
                id: transactionData.senderID
            }})
            if (!senderWallet) {
                this.logger.error("Invalid sender wallet.")
                return res.status(400).json({
                    message: "Invalid sender wallet."
                })
            }
            const receiverWallet = await this.walletRepository.findOne({where: {id: transactionData.receiverID}})
            if(!receiverWallet) {
                this.logger.error("Invalid receiver wallet.")
                return res.status(400).json({
                    message: "Invalid receiver wallet."
                })
            }
            if (senderWallet.balance < transactionData.amount) {
                this.logger.error("Not enough balance.")
                return res.status(400).json({
                    message: "Sender does not have sufficient balance."
                })
            }
            const senderBalance = senderWallet.balance - transactionData.amount
            await this.walletRepository.update({id: senderWallet.id}, {
                balance: senderBalance
            })
            const receiverBalance = receiverWallet.balance + transactionData.amount
            await this.walletRepository.update({id: receiverWallet.id}, {
                balance: receiverBalance
            })
            const result = await this.transactionRepository.create({
                sender: senderWallet,
                receiver: receiverWallet,
                senderID: senderWallet.id,
                receiverID: receiverWallet.id,
                amount: transactionData.amount,
            })
            const transaction = await this.transactionRepository.save(result)
            return res.status(201).json({
                message: "Transaction performed successfully.",
                transaction
            })
        } catch (error) {
            this.logger.error(`Error creating transaction.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}