import { Request, Response } from "express"

export default interface IUsersService {
    getAllUsers(res: Response): Promise<any>
    createUser(userData, res: Response):Promise<any>
    getUserByID(id, req: Request, res: Response):Promise<any>
    updateUser(id, patchData, req: Request, res: Response):Promise<void>
    deleteUser(id, req: Request, res: Response):Promise<void>
}