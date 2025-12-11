import { Injectable, Logger } from '@nestjs/common';
import IWalletService from '../../interfaces/IWalletServices';
import { Request, Response } from 'express';
import GetAllWalletsService from '../../use-case/GetAllWallets';
import CreateWalletService from '../../use-case/CreateWallet';
import { WalletDTO } from '../../dto/wallet.dto';
import GetWalletByIDService from '../../use-case/GetWalletByID';
import GetWalletByUserIDService from '../../use-case/GetWalletByUserID';
import UpdateWalletByIDService from '../../use-case/UpdateWalletByID';
import DeleteWalletByIDService from '../../use-case/DeleteWalletByID';

@Injectable()
export class WalletService implements IWalletService {
    private readonly logger = new Logger(WalletService.name);
    constructor(
        private readonly getAllWalletService: GetAllWalletsService,
        private readonly createWalletService: CreateWalletService,
        private readonly getWalletByIDService: GetWalletByIDService,
        private readonly getWalletByUserIDService: GetWalletByUserIDService,
        private readonly updateWalletByIDService: UpdateWalletByIDService,
        private readonly deleteWalletByIDService: DeleteWalletByIDService
    ) {
    }
    async getAllWallets(req: Request, res: Response): Promise<any> {
        try{
            return await this.getAllWalletService.execute(req, res);
        } catch (error) {
            throw error;
        }
    }
    async createWallet(walletData: WalletDTO, req: Request, res: Response): Promise<any> {
        try {
            return await this.createWalletService.execute(walletData, req, res);
        } catch (error) {
            throw error;
        }
    }
    async getWalletByUserID(req: Request, res: Response): Promise<any> {
        try {
            return await this.getWalletByUserIDService.execute(req, res);
        } catch (error) {
            throw error;
        }
    }
    async updateWalletByID(id: any, updateData: WalletDTO, req: Request, res: Response): Promise<any> {
        try {
            return await this.updateWalletByIDService.execute(id,updateData,req,res);
        } catch (error) {
            throw error;
        }
    }
    async deleteWalletByID(id: any, req: Request, res: Response): Promise<any> {
        try {
            return await this.deleteWalletByIDService.execute(id, req, res);
        } catch (error) {
            throw error;
        }
    }
    async getWalletByID(id: any, req: Request, res: Response): Promise<any> {
        try {
            return await this.getWalletByIDService.execute(id, req, res);
        } catch (error) {
            throw error;
        }
    }
    async depositByID(depositData: any, req: Request, res: Response): Promise<any> {
        throw new Error('Method not implemented.');
    }
    async withdrawByID(withdrawData: any, req: Request, res: Response): Promise<any> {
        throw new Error('Method not implemented.');
    }
}
