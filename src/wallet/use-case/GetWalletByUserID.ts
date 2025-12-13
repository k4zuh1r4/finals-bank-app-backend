import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "../entities/wallet.entity";
import { Request, Response } from "express";

export default class GetWalletByUserIDService {
    private readonly logger = new Logger(GetWalletByUserIDService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(req: Request, res: Response) {
        try {
            this.logger.debug(`Finding wallet under current user.`);
            const user = req.user?.id;
            const wallets = await this.walletRepository.find({
                where:
                {
                    userID: user,
                }
            });
            if (!wallets) {
                this.logger.error(`There is no wallet registered by this user.`);
                return res.status(404).json({
                    message: `There is no wallet registered by this user.`
                });
            }
            return res.status(200).json({
                message: `Successfully retrieved wallet list from user.`,
                wallets
            })
        } catch (error) {
            this.logger.error("Internal server error.");
            return res.status(500).json({
                message: "Internal server error.",
                error
            })
        }
    }
}