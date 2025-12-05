import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class RegisterDTO {
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    passwordConfirm: string
}