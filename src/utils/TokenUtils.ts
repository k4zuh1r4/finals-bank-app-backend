import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config"
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
@Injectable()
export default class TokenUtils {
    constructor(
        private readonly configService: ConfigService
    ) {}
    async signToken(id: string, role: any) {
        const secret = this.configService.get<string>('JWT_SECRET');
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({ id, role }, secret, {
            expiresIn: '1h'
        });
    }
    async createSendToken(user, req: Request, res: Response) {
        const token = await this.signToken(user.id, user.role);
        res.cookie('jwt', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 1*24*60*60*1000),
            secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
        })
        user.password = undefined;
        return {token, user}
    }
}