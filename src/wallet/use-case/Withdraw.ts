import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { WithdrawDTO } from "../dto/withdraw.dto";
import { Wallet } from "../entities/wallet.entity";
import { Request, Response } from "express";

export default class WithdrawService {
    private readonly logger = new Logger(WithdrawService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(withdrawData: WithdrawDTO, req: Request, res: Response) {
        try {
            this.logger.debug(`Finding wallet.`);
            const user = req.user?.id;
            const walletExists = await this.walletRepository.findOne({
                where:
                {
                    userID: user,
                    id: withdrawData.id
                }
            });
            if (!walletExists) {
                this.logger.error(`Wallet not found under user's wallet list.`);
                return res.status(404).json({
                    message: "No wallet found under this account."});
            }
            this.logger.debug(`Wallet found, updating information.`);
            if (withdrawData.withdrawAmount > walletExists.balance) {
                return res.status(400).json({
                    message: "Wallet does not have enough money reserved to be withdrawn."
                });
            }
            const newBalance = walletExists.balance - withdrawData.withdrawAmount
            const update = await this.walletRepository.update({id: withdrawData.id}, {balance:newBalance});
            return res.status(200).json({
                message: "Deposit complete.",
                update
            });
        } catch (error) {
            this.logger.error(`Error withdrawing.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}