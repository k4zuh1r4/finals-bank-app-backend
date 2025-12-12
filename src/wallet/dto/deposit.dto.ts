import {  IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class DepositDTO {
    @IsNotEmpty({message: "Needs an ID to deposit."})
    @IsString()
    id: string;

    @IsNotEmpty({message: "Needs a number."})
    @IsNumber()
    @Min(1)
    depositAmount: number;
}