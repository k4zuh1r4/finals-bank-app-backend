import { Request, Response } from "express"
import { LoginDTO } from "../dto/login.dto"
import { RegisterDTO } from "../dto/register.dto"

export default interface IAuthService {
    register(registerData: RegisterDTO, req: Request, res: Response): Promise<any>
    login(loginData: LoginDTO, req: Request, res: Response):Promise<any>
    resetPassword(token, req: Request, res: Response):Promise<any>
    forgotPassword(req: Request, res: Response):Promise<any>
    logout(res: Response):Promise<any>
}