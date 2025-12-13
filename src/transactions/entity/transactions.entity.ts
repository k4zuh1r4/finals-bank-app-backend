import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Min } from "class-validator";
import { Wallet } from "../../wallet/entities/wallet.entity";

@Entity('transactions')
export class Transaction {
    constructor() {}
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => Wallet, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'senderID' })
    sender: Wallet
    @Column({ type: 'uuid' })
    senderID: string

    @ManyToOne(() => Wallet, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'receiverID' })
    receiver: Wallet
    @Column({ type: 'uuid' })
    receiverID: string

    @Min(0)
    @Column({ nullable: false, default: 0 })
    amount: number

    @CreateDateColumn()
    createdAt: Date;
}
