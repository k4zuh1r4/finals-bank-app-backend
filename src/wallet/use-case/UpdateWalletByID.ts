import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "../entities/wallet.entity";
import { Request, Response } from "express";

export default class UpdateWalletByIDService {
    private readonly logger = new Logger(UpdateWalletByIDService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(id: any, updateData: any, req: Request, res: Response) {
        try {
            this.logger.debug(`Finding wallet with ${id}`);
            const user = req.user?.id;
            const walletExists = await this.walletRepository.findOne({
                where:
                {
                    userID: user,
                    id: id
                }
            });
            if (!walletExists) {
                this.logger.error(`Wallet not found under user's wallet list.`);
                return res.status(404).json({
                    message: "No wallet found under this account."});
            }
            this.logger.debug(`Wallet found, updating information.`);
            const update = await this.walletRepository.update({id: id}, updateData);
            return res.status(200).json({
                message: "Updated successfully.",
                update
            })
        } catch (error) {
            this.logger.error(`Error finding wallet.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}