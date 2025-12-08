import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../users/entities/user.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import TokenUtils from "../../utils/TokenUtils";
import { RegisterDTO } from "../dto/register.dto";
import { Request, Response } from "express";

export default class RegisterUser {
    private readonly logger = new Logger(RegisterUser.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService,
        private readonly tokenUtils: TokenUtils,
    ) {}
    async execute(registerData: RegisterDTO, req: Request, res: Response) {
        try  {
            this.logger.debug("Checking if user exists");
            const exists = await this.userRepository.findOne({where: {email: registerData.email}});
            if (exists) {
                this.logger.error("User with this email already exists.");
                return res.status(Number(this.configService.get<number>("STATUS_BAD_REQUEST")) || 400).json({
                    message: "User already exists."
                });
            }
            if (registerData.password !== registerData.passwordConfirm) {
                this.logger.error("Password does not match.");
                return res.status(Number(this.configService.get<number>("STATUS_BAD_REQUEST")) || 400).json({
                    message: "Password does not match."
                });
            }
            const {name, email, password,passwordConfirm } = registerData
            const user = this.userRepository.create({
                name,
                email,
                password,
                passwordConfirm,
            })
            await this.userRepository.save(user)
            const token = await this.tokenUtils.createSendToken(user, req, res);
            this.logger.debug("Success.");
            return res.status(201).json(
                { message: "User registered.", token }
            );
        } catch (error) {
            this.logger.error("Internal server error.")
            throw res.status(500).json({
                message: "Internal server error.",
                error
            });
        }
    }
}