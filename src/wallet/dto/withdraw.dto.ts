import {  IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class WithdrawDTO {
    @IsNotEmpty({message: "Needs an ID to withdraw."})
    @IsString()
    id: string;

    @IsNotEmpty({message: "Needs a number."})
    @IsNumber()
    @Min(1)
    withdrawAmount: number;
}