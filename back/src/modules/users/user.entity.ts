import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
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
  avatar: string;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column({ default: true })
  @ApiProperty()
  isActive: boolean;
}
