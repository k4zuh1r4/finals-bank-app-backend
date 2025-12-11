import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';import { Wallet } from '../../entities/wallet.entity';
import { WalletService } from '../../services/wallet/wallet.service';
import GetAllWalletsService from '../../use-case/GetAllWallets';
import CreateWalletService from '../../use-case/CreateWallet';
import GetWalletByIDService from '../../use-case/GetWalletByID';
import GetWalletByUserIDService from '../../use-case/GetWalletByUserID';
import UpdateWalletByIDService from '../../use-case/UpdateWalletByID';
import DeleteWalletByIDService from '../../use-case/DeleteWalletByID';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
    ],
    providers: [
        WalletService,
        GetAllWalletsService,
        CreateWalletService,
        GetWalletByIDService,
        GetWalletByUserIDService,
        UpdateWalletByIDService,
        DeleteWalletByIDService
    ],
    exports: [WalletService],
    })
export class WalletModule {}
