import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { MailService } from "../services/mail/mail.service";
import { Logger } from "@nestjs/common";
import { Request, Response } from "express";

export default class ForgotPassword{
    private readonly logger = new Logger(ForgotPassword.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailService
    ) {}
    async execute(req: Request, res: Response) {
        this.logger.debug("Finding existing user.")
        const user = await this.userRepository.findOne({where: {email: req.body.email}});
        if (!user) {
            this.logger.error("User not found.");
            return res.status(404).json({
                message: "User not found."
            })
        }
        const resetToken = user.createPasswordResetToken();
        await this.userRepository.save(user);
        this.logger.debug("Attempting to create and send reset URL.");
        try {
            const resetURL = `${req.protocol}://${req.get('host')}/auth/reset-password/${resetToken}`;
            await this.mailService.send(user, resetURL, 'passwordReset', 'Deez');
            this.logger.debug("Success.");
            return res.status(200).json({message: 'Password reset email sent successfully.', resetToken});
        } catch (error) {
            this.logger.error("Forget Password process failed.");
            if (user) {
                user.passwordResetExpires = null;
                user.passwordChangedAt = null;
                await this.userRepository.save(user);
            }
            return res.status(500).json({message: "Internal server error.", error})
        }
    }
}