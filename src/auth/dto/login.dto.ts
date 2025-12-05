import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({message: "Missing email"})
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsNotEmpty({message: "Missing password"})
    @IsString()
    @MinLength(8, { message: 'Minimum 8 characters' })
    @MaxLength(40, { message: 'Maximum 40 characters' })
    password: string;
}