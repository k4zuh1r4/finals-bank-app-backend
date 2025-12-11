import * as bcrypt from 'bcryptjs'
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as crypto from 'crypto'
@Entity("users")
export class User {
    constructor(
    ) {}
    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column({ nullable: false })
    name: string
    @Column({ nullable: false, unique: true })
    email: string
    @Column({
        type: 'enum',
        enum: ['user', 'admin'],
        default: 'user'
    })
    role: 'user' | 'admin' 
    @Column({ nullable: false, select: false })
    password: string
    @Column({ nullable: true, select: false })
    passwordConfirm: string
    @Column({ type: 'timestamp', nullable: true })
    passwordChangedAt: Date | null | undefined
    @Column({ nullable: true })
    passwordResetToken: string
    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date | null | undefined
    @Column({ default: true, select: false })
    active: boolean
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            const hash = await bcrypt.hash(this.password, 12)
            this.password = hash
            this.passwordConfirm = ""
            return this.password
        }
    }
    changePasswordAfter(JWTTimestamp: number) {
        if (this.passwordChangedAt) {
            const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000)
            return JWTTimestamp < changedTimestamp
        }
        return false
    }
    createPasswordResetToken() {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = new Date(Date.now() + 10*60*1000)
        return resetToken
    }
}