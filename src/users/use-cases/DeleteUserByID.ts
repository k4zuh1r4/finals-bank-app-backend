import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";

export default class DeleteUserByIDService {
    private readonly logger = new Logger(DeleteUserByIDService.name)
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(id: any, res: Response) {
         try {
            this.logger.debug(`Service level: Finding user with ID ${id}`);
            const exists = await this.userRepository.findOne({where: {id: id}});
            if (!exists) {
                this.logger.error('No account with this ID exists.');
                return res.status(400).json({
                    message: 'No account with this ID exists.'
                });
            }
            else {
                this.logger.debug('User found, deleting.')
                const result = await this.userRepository.delete({id: id})
                return res.status(204).json({
                    message: 'User deleted successfully.',
                    result
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error.',
                error
            })   
        }
    }
}