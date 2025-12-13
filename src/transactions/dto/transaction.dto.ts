import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { CreateDateColumn } from "typeorm";

export class TransactionDTO {

    @IsNotEmpty()
    @IsString()
    senderID: string;

    @IsNotEmpty({message: "Needs an ID to deposit."})
    @IsString()
    receiverID: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    amount: number;

    @CreateDateColumn()
    createdAt: Date;


}