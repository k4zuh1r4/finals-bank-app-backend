import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDTO } from "../dto/login.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import TokenUtils from "../../utils/TokenUtils";

export default class LoginUser {
    private readonly logger = new Logger(LoginUser.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tokenUtils: TokenUtils,   
    ) {}
    async execute(loginData: LoginDTO, req: Request, res: Response) {
        try {
            this.logger.debug("Logging in.");
            const {email, password} = loginData;
            const user = await this.userRepository.findOne(
                {
                    where: {email: email},
                    select: ['id', 'email','password', 'role']
                });
            if (!user) {
                return res.status(400).json({
                    message: "User not found."
                });
            }
            if (!(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({
                    message: "Password does not match."
                });
            }
            const token = await this.tokenUtils.createSendToken(user, req, res);
            this.logger.debug("Success.");
            return res.status(200).json({message: "successfully logged in", token});
        } catch (error) {
            this.logger.error("Internal server error.");
            throw res.status(500).json({
                message: "Internal server error.",
                error
            });
        }
    }
}