import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../entity/transactions.entity';
import { TransactionsService } from '../../services/transactions/transactions.service';
import GetAllTransactionService from '../../use-cases/GetAllTransactions';
import CreateTransactionsService from '../../use-cases/CreateTransactions';
import { Wallet } from '../../../wallet/entities/wallet.entity';
import GetTransactionsByUserIDService from '../../use-cases/GetTransactionsByUserID';
import GetTransactionsByIDService from '../../use-cases/GetTransactionsByID';
@Module({
     imports: [
        TypeOrmModule.forFeature([Transaction]),
        TypeOrmModule.forFeature([Wallet]),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [
        TransactionsService,
        GetAllTransactionService,
        CreateTransactionsService,
        GetTransactionsByUserIDService,
        GetTransactionsByIDService,
    ],
    exports: [TransactionsService]
})
export class TransactionsModule {}
