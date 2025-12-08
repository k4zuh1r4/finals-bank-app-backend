import { Injectable, Logger } from '@nestjs/common';
import IUsersService from '../../interfaces/IUserServices';
import GetAllUserService from '../../use-cases/GetAllUsers';
import CreateUserService from '../../use-cases/CreateUser';
import GetUserByIDService from '../../use-cases/GetUserByID';
import { Request, Response } from 'express';
import UpdateUserByIDService from '../../use-cases/UpdateUserByID';
import DeleteUserByIDService from '../../use-cases/DeleteUserByID';

@Injectable()
export class UsersService implements IUsersService {
    private readonly logger = new Logger(UsersService.name)
    constructor(
        private readonly getAllUserService: GetAllUserService,
        private readonly createUserService: CreateUserService,
        private readonly getUserByIDService: GetUserByIDService,
        private readonly updateUserByID: UpdateUserByIDService,
        private readonly deleteUserByID: DeleteUserByIDService,
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
    async getUserByID(id: any, req: Request, res: Response): Promise<any> {
         try {
            this.logger.debug("Service level - Getting user by ID.");
            return await this.getUserByIDService.execute(id, req, res);
         } catch (error) {
            throw error;
         }
    }
    async updateUser(id: any, patchData: any, req: Request, res: Response): Promise<void> {
         try {
            this.logger.debug("Service level - Updating user by ID.");
            await this.updateUserByID.execute(id, patchData, req, res);
         }
         catch (error) {
            throw error;
         }
    }
    async deleteUser(id: any, req: Request, res: Response): Promise<void> {
        try {
            this.logger.debug("Service level - Delete user by ID.");
            await this.deleteUserByID.execute(id, req, res);
        } catch (error) {
            throw error;
        }
    }
}
