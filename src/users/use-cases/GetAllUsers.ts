import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";

export default class GetAllUserService {
    private readonly logger = new Logger(GetAllUserService.name)
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(res: Response) {
        try {
            this.logger.debug("Begin fetching all users.");
            const result = await this.userRepository.find({where: {active: true}});
            this.logger.debug("Success.");
            return res.status(200).json({message: "Succeed.", result})
            } catch (error) {
                this.logger.error(`Error fetching all users: ${error}`);
                return res.status(500).json({message: "Cannot list all users.", error})
            }
        }
    }