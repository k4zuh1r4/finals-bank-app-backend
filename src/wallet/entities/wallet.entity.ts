import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Min } from "class-validator";

@Entity('wallet')
export class Wallet {
    constructor(
    ) {}
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'userID' })
    user: User

    @Column({ type: 'uuid' })
    userID: string
    @Min(0)
    @Column({ nullable: false, default: 0 })
    balance: number

    @Column({
        nullable: false,
        type: 'enum',
        enum: ['personal', 'business'],
        default: 'personal'
    })
    type: 'personal' | 'business'
    @Column({ default: true, select: false })
    active: boolean
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
