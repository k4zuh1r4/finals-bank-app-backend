import { Module } from '@nestjs/common';
import { UsersModule } from './users/modules/users/users.module';
import { UsersController } from './users/controller/users/users.controller';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './external/database/database.module';
import { AuthController } from './auth/controller/auth/auth.controller';
import { AuthService } from './auth/services/auth/auth.service';
import { AuthModule } from './auth/modules/auth/auth.module';
import { MailService } from './auth/services/mail/mail.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [MailService],
})
export class AppModule {}
