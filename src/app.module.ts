import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users/users.module';
import { UsersController } from './users/controller/users/users.controller';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './external/database/database.module';
import { AuthController } from './auth/controller/auth/auth.controller';
import { AuthModule } from './auth/modules/auth/auth.module';
import { MailService } from './auth/services/mail/mail.service';
import { WalletModule } from './wallet/module/wallet/wallet.module';
import { WalletController } from './wallet/controller/wallet/wallet.controller';
import { TransactionsModule } from './transactions/module/transactions/transactions.module';
import { TransactionsController } from './transactions/controller/transactions/transactions.controller';
import { TransactionsService } from './transactions/services/transactions/transactions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    WalletModule,
    TransactionsModule,
  ],
  controllers: [UsersController, AuthController, WalletController, TransactionsController],
  providers: [MailService, TransactionsService],
})
export class AppModule {}
