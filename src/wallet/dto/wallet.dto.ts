import { IsEnum, IsNotEmpty } from "class-validator";

enum WalletType {
    personal = 'personal',
    business = 'business'
}

export class WalletDTO {
    @IsNotEmpty({message: "Missing wallet type."})
    @IsEnum(WalletType)
    type: WalletType;
}