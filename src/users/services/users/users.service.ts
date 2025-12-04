import { Injectable, Logger } from '@nestjs/common';
import IUsersService from '../../interfaces/IUserInterface';
import GetAllUserService from '../../use-cases/GetAllUsers';
import CreateUserService from '../../use-cases/CreateUser';
import GetUserByIDService from '../../use-cases/GetUserByID';
import { Response } from 'express';

@Injectable()
export class UsersService implements IUsersService {
    private readonly logger = new Logger(UsersService.name)
    constructor(
        private readonly getAllUserService: GetAllUserService,
        private readonly createUserService: CreateUserService,
        private readonly getUserByIDService: GetUserByIDService,
    ) {}
    async getAllUsers(res: Response): Promise<any> {
        try {
            this.logger.debug("Service level - Getting all users.");
            return await this.getAllUserService.execute(res);
        } catch(error) {
            throw error;
        }
    }
    async createUser(userData: any, res: Response): Promise<any> {
        try {
            this.logger.debug("Service level - Creating all users.");
            return await this.createUserService.execute(userData, res);
        } catch (error) {
            throw error;
        }
    }
    async getUserByID(id: any, res: Response): Promise<any> {
         try {
            this.logger.debug("Service level - Getting user by ID.");
            return await this.getUserByIDService.execute(id, res);
         } catch (error) {
            throw error;
         }
    }
    async updateUser(id: any, patchData: any): Promise<void> {
         console.log({
            id, patchData,
            message: "updateUser"
         })
    }
    async deleteUser(id: any): Promise<any> {
        return(
            {
                id, 
                message: "getUserByID"
            })
    }
}
