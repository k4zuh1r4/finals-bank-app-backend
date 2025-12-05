import { Injectable, Logger, RequestMapping } from '@nestjs/common';
import IAuthService from '../../interface/IAuthService';
import { RegisterDTO } from '../../dto/register.dto';
import { LoginDTO } from '../../dto/login.dto';
import { Request, Response } from 'express';
import RegisterUser from '../../use-cases/RegisterUser'
import LoginUser from '../../use-cases/LoginUser';
import LogoutUser from '../../use-cases/LogoutUser';
import ForgotPassword from '../../use-cases/ForgotPassword'
import ResetPassword from '../../use-cases/ResetPassword';


@Injectable()
export class AuthService implements IAuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly registerService: RegisterUser,
        private readonly loginService: LoginUser,
        private readonly logoutService: LogoutUser,
        private readonly forgotPasswordService: ForgotPassword,
        private readonly resetPasswordService: ResetPassword,
    ) {}
    async register(registerData: RegisterDTO, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Service level: Registering user.");
            return await this.registerService.execute(registerData, req, res);
        } catch(error) {
            this.logger.error("Failed to register user.");
            throw error;
        }
    }
    async login(loginData: LoginDTO, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Service level: Logging in.");
            return await this.loginService.execute(loginData, req, res);
        } catch (error) {
            this.logger.error("Failed to login.");
            throw error;
        }
    }
    async resetPassword(token: any, req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Service level: Resetting password.")
            return await this.resetPasswordService.execute(token, req, res);
        } catch (error) {
            this.logger.error("Failed to trigger reset password process.");
            throw error;
        }
    }
    async forgotPassword(req: Request, res: Response): Promise<any> {
        try {
            this.logger.debug("Service level: Forgot password.")
            return await this.forgotPasswordService.execute(req, res);
        } catch (error) {
            this.logger.error("Failed to trigger forgot password process.")
            throw error;
        }
    }
    async logout(res: Response): Promise<any> {
        try {
            this.logger.debug("Service level: Logging out.")
            return await this.logoutService.execute(res);
        } catch (error) {
            this.logger.error("Failed to log out.")
            throw error;
        }
    }
}
