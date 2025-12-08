import { Request, Response } from "express";

export default interface IWalletService {
    getAllWallets(req: Request, res: Response): Promise<any>;
    createWallet(walletData: any, req: Request, res: Response): Promise<any>;
    getWalletByUserID(id: any, req: Request, res: Response): Promise<any>;
    updateWalletByID(id:any, updateData, req: Request, res: Response): Promise<any>;
    deleteWalletByID(id: any, req: Request, res: Response): Promise<any>;
    getWalletByID(id: any,  req: Request, res: Response): Promise<any>;
    depositByID(depositData: any, req: Request, res: Response): Promise<any>;
    withdrawByID(withdrawData: any, req: Request,res: Response): Promise<any>;
}