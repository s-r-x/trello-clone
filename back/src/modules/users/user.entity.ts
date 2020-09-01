import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, OmitType } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  login: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  avatar?: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({ default: false })
  @ApiProperty()
  isEmailConfirmed: boolean;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;
}
export interface IPublicUser extends Omit<User, 'password'> {}
