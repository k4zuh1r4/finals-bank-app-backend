import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Wallet } from "../entities/wallet.entity";
import { Repository } from "typeorm";

export default class GetAllWalletsService {
    private readonly logger = new Logger(GetAllWalletsService.name)
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(req: Request, res: Response) {
        try{
        this.logger.debug("Retrieving all wallets.");
        const result = await this.walletRepository.find({where: {active: true}});
        this.logger.debug("Success.");
        return res.status(200).json({
            message: "Retrieved all wallets successfully.",
            result
        })
        } catch (error) {
            this.logger.error("Error retrieving wallet list.");
            throw res.status(500).json({
                message: "Internal server error."
            })
        }
    }
}