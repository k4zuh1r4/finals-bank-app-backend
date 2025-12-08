import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request, Response } from "express";
import { Wallet } from "../entities/wallet.entity";
import { Repository } from "typeorm";
import { WalletDTO } from "../dto/wallet.dto";

export default class CreateWalletService {
    private readonly logger = new Logger(CreateWalletService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}

    async execute(walletData: WalletDTO, req: Request, res: Response) {
        try {
            if ((await this.walletRepository.findOne({
                where: {
                    userID: req.user?.id,
                    type: walletData.type
                }
            }))) {
                return res.status(400).json({
                    message: "User already owned a wallet of this type."
                })
            }
            this.logger.debug("Creating wallet.");
            const wallet = this.walletRepository.create({
                user: req.user,
                userID: req.user?.id,
                ...walletData
            })
            this.logger.debug("Wallet successfully created, saving.");
            const saveWallet = this.walletRepository.save(wallet)
            this.logger.debug("Complete.")
            return res.status(201).json({
                message: "Wallet succesfully saved.",
                saveWallet
            })
        } catch (error) {
            this.logger.debug("Internal server error");
            throw res.status(500).json({
                message: "Internal server error.",
                error
            })
        }
    }
}