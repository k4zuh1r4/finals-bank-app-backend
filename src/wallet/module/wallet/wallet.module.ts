import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Wallet } from '../../entities/wallet.entity';
import { WalletService } from '../../services/wallet/wallet.service';
import GetAllWalletsService from '../../use-case/GetAllWallets';
import CreateWalletService from '../../use-case/CreateWallet';

@Module({
    imports: [
        TypeOrmModule.forFeature([Wallet]),
    ],
    providers: [
        WalletService,
        GetAllWalletsService,
        CreateWalletService,
    ],
    exports: [WalletService],
    })
export class WalletModule {}
