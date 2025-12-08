import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Wallet } from '../../entities/wallet.entity';
import { WalletService } from '../../services/wallet/wallet.service';
import GetAllWalletsService from '../../use-case/GetAllWallets';
import CreateWalletService from '../../use-case/CreateWallet';
import GetWalletByIDService from '../../use-case/GetWalletByID';
import GetWalletByUserIDService from '../../use-case/GetWalletByUserID';

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
    ],
    exports: [WalletService],
    })
export class WalletModule {}
