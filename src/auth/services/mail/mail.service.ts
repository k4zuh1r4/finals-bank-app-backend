import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
    constructor(private readonly configService: ConfigService) {}

    private newTransport() {
        return nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: Number(this.configService.get<number>('EMAIL_PORT')),
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USERNAME'),
                pass: this.configService.get('EMAIL_PASSWORD')
            }
        } as SMTPTransport.Options)
    }
    async send(user, url, template, subject) {
        const to = user.email;
        const firstName = user.name.split(' ')[0];
        const from = `k4zuh1r4 <${this.configService.get('EMAIL_FROM')}>`;
        let html = 'Welcome';
        if (template === 'passwordReset') {
            html = `<div style='font-family: Arial, sans-serif; line-height: 1.5;'><h2>Password Reset Request</h2><p>We received a request to reset your password. Click the link below to set a new password:</p><a href='${url}' style='display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; text-decoration: none;'>Reset Password</a><p>If you did not request a password reset, please ignore this email. This link will expire in 1 hour.</p><p>Thank you,</p><p>k4zuh1r4</p></div>`;
        }
        const mailOptions = {
            from,
            to,
            subject,
            html,
        };
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome(user, url) {
        await this.send(user, url, 'Welcome', 'Welcome to deez nuts');
    }

    async sendPasswordReset(user, url) {
        await this.send(user, url, 'passwordReset', 'Your password reset token (valid for only 10 minutes).');
    }
}
