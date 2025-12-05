import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { MoreThan, Repository } from "typeorm";
import TokenUtils from "../../utils/TokenUtils";
import { Request, Response } from "express";
import * as crypto from 'crypto';
export default class ResetPassword {
    private readonly logger = new Logger(ResetPassword.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tokenUtils: TokenUtils,
    ) {}
    async execute(token: any, req: Request, res: Response) {
        this.logger.debug("Finding user with reset token.")
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await this.userRepository.findOne({
            where: {
                passwordResetToken: hashedToken,
                passwordResetExpires: MoreThan(new Date())
            }
        })
        this.logger.debug("Succeed. Saving new password.");
        if (!user) {
            this.logger.error('Invalid: No user found.');
            return res.status(400).json({message: "Token is invalid."})
        }
        user.password = req.body.password;
        user.passwordConfirm = req.body.passwordConfirm;
        user.passwordResetToken = '';
        user.passwordResetExpires = null;
        await this.userRepository.save(user);
        const sendToken = await this.tokenUtils.createSendToken(user, req, res);
        return res.status(200).json({message: "Successfully changed password.",sendToken})
    }
}