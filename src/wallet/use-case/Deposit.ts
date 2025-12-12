import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { Wallet } from "../entities/wallet.entity";
import { DepositDTO } from "../dto/deposit.dto";

export default class DepositService {
    private readonly logger = new Logger(DepositService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(depositData: DepositDTO, req: Request, res: Response) {
        try {
            this.logger.debug(`Finding wallet.`);
            const user = req.user?.id;
            const walletExists = await this.walletRepository.findOne({
                where:
                {
                    userID: user,
                    id: depositData.id
                }
            });
            if (!walletExists) {
                this.logger.error(`Wallet not found under user's wallet list.`);
                return res.status(404).json({
                    message: "No wallet found under this account."});
            }
            this.logger.debug(`Wallet found, updating information.`);
            const newBalance = walletExists.balance + depositData.depositAmount;
            const update = await this.walletRepository.update(
                { id: depositData.id },
                { balance: newBalance }
            );
            return res.status(200).json({
                message: "Deposit complete.",
                update
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