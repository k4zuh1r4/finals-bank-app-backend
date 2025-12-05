import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { AuthService } from '../../services/auth/auth.service';
import TokenUtils from '../../../utils/TokenUtils';
import RegisterUser from '../../use-cases/RegisterUser';
import LoginUser from '../../use-cases/LoginUser';
import LogoutUser from '../../use-cases/LogoutUser';
import ForgotPassword from '../../use-cases/ForgotPassword';
import { MailService } from '../../services/mail/mail.service';
import ResetPassword from '../../use-cases/ResetPassword';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ConfigModule.forRoot({ isGlobal: true }),
    ],
    providers: [
        AuthService,
        MailService, 
        TokenUtils,
        RegisterUser,
        LoginUser,
        LogoutUser,
        ForgotPassword,
        ResetPassword,

    ],
    exports: [AuthService, TokenUtils, MailService]

})
export class AuthModule {}
