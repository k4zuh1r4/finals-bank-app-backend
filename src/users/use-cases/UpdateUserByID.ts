import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";

export default class UpdateUserByIDService {
    private readonly logger = new Logger(UpdateUserByIDService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    async execute(id:any, patchData:any, res: Response) {
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
                this.logger.debug('Account found, patching data.');
                const result = await this.userRepository.update({id: id}, patchData);
                this.logger.debug('Success');
                return  res.status(200).json({
                    message: 'User updated.',
                    result
                });
            }
        } catch(error) {
            this.logger.error('Server error.');
            return res.status(500).json({
                message: 'Internal server error.',
                error
            });
        }
    }
}