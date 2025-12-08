import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";

export default class CreateUserService {
    private readonly logger = new Logger(CreateUserService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(userData:any, res: Response) {
        try {
            this.logger.debug("Creating user");
            const user = this.userRepository.create(userData);
            this.logger.debug("Success");
            const save = await this.userRepository.save(user);
            return res.status(201).json({message: "Succeed.", save})
        } catch (error) {
            this.logger.debug("Internal server error.");
            throw res.status(500).json({message: "Internal server error.", error})
        }
    }
}