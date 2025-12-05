import { Logger } from "@nestjs/common";
import TokenUtils from "../../utils/TokenUtils";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

export default class LogoutUser {
    private readonly logger = new Logger(LogoutUser.name);
    constructor (
        private readonly tokenUtils: TokenUtils,
        private readonly configService: ConfigService
    ) {}
    async execute (res: Response) {
        try {
            this.logger.debug("Expiring user's token.")
            res.cookie('jwt','logout', {
                expires: new Date(Date.now() +10*1000),
                httpOnly:true
            })
            return res.status(200).json({message: "Logged out successfully."})
        } catch (error) {
            throw res.status(500).json({
                message: "Internal server error.",
                error
            });
        }
    }
}