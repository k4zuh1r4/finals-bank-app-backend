import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "../entities/wallet.entity";
import { Request, Response } from "express";

export default class CreateWalletService {
    private readonly logger = new Logger(CreateWalletService.name);
    constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
    ) {}
    async execute(id: any, req: Request, res: Response) {
        try {

        } catch (error) {

        }
    }
}
