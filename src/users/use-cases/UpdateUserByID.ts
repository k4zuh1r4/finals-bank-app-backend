import { Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { Response } from "express";
import { ConfigService } from "@nestjs/config";

export default class UpdateUserByIDService {
    private readonly logger = new Logger(UpdateUserByIDService.name);
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
    ) {}
    async execute(id:any, patchData:any, res: Response) {
        try {
            this.logger.debug(`Service level: Finding user with ID ${id}`);
            const exists = await this.userRepository.findOne({where: {id: id}});
            if (!exists) {
                this.logger.error('No account with this ID exists.');
                return res.status(Number(this.configService.get<number>('STATUS_BAD_REQUEST')) ||400).json({
                    message: 'No account with this ID exists.'
                });
            }
            else {
                this.logger.debug('Account found, patching data.');
                const result = await this.userRepository.update({id: id}, patchData);
                this.logger.debug('Success');
                return  res.status(Number(this.configService.get<number>('STATUS_OK')) || 200).json({
                    message: 'User updated.',
                    result
                });
            }
        } catch(error) {
            this.logger.error('Server error.');
            return res.status(Number(this.configService.get<number>('STATUS_SERVER_ERROR')) || 500).json({
                message: 'Internal server error.',
                error
            });
        }
    }
}