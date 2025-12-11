import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "../entities/wallet.entity";
import { Request, Response } from "express";

export default class DeleteWalletByIDService {
    private readonly logger = new Logger(DeleteWalletByIDService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(id: any, req: Request, res: Response) {
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
            this.logger.debug(`Wallet found, deleting wallet.`);
            const result = this.walletRepository.delete({id: id});
            return res.status(204).json({
                message: "Wallet deleted successfully."
            })
        } catch (error) {
            this.logger.error(`Error deleting wallet.`);
            return res.status(500).json({
                message: "Internal server error.", 
                error
            });
        }
    }
}