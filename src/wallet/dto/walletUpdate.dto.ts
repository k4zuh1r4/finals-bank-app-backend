import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";

enum WalletType {
    personal = 'personal',
    business = 'business'
}

export class WalletUpdateDTO {

    @IsNumber()
    balance: number;

    @IsEnum(WalletType)
    type: WalletType;
}