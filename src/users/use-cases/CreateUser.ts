import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

export default class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}
    async execute(userData:any, res: Response) {
        try {
            this.logger.debug("Creating user");
            const user = this.userRepository.create(userData);
            this.logger.debug("Success");
            const save = await this.userRepository.save(user);
            return res.status(Number(this.configService.get<number>('STATUS_OK')) || 200).json({message: "Succeed.", save})
        } catch (error) {
            this.logger.debug(`Error creating user: ${error}`);
            throw res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST')) || 400).json({message: "Failed to create user. Email has already been registered or incomplete data.", error})
        }
    }
}