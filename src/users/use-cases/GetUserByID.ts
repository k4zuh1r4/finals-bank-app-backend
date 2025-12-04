import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

export default class GetUserByIDService {
    private readonly logger = new Logger(GetUserByIDService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}
    async execute(id:any, res: Response) {
        try {
            this.logger.debug("Begin fetching user by ID.")
            const result = await this.userRepository.findOne({where: { id: id, active: true}})
            this.logger.debug("Success.")
            return res.status(Number(this.configService.get<number>('STATUS_OK')) || 200).json({message: "Succeed.", result})
        } catch(error) {
            this.logger.error(`Error getting user with ID ${id}: ${error}`)
            return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST'))).json({message: "User not found.", error})
        }
    }
}