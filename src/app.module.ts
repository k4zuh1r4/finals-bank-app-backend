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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
    WalletModule,
  ],
  controllers: [UsersController, AuthController, WalletController],
  providers: [MailService],
})
export class AppModule {}
