import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Request, Response } from "express";

export default class GetUserByIDService {
    private readonly logger = new Logger(GetUserByIDService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(id:any, req: Request, res: Response) {
        try {
            if (req.user?.id !== id) {
                return res.status(403).json({
                    message: "Not allowed to interact with other accounts."
                })
            }
            this.logger.debug("Begin fetching user by ID.");
            const result = await this.userRepository.findOne({where: { id: id, active: true}});
            this.logger.debug("Success.");
            return res.status(200).json({message: "Succeed.", result});
        } catch(error) {
            this.logger.error(`Error getting user with ID ${id}: ${error}`);
            return res.status(404).json({message: "User not found.", error});
        }
    }
}