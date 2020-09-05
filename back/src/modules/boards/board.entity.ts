import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@/modules/users/user.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @OneToOne(() => User)
  @ApiProperty()
  owner: User;

  @Column()
  @ApiProperty()
  private: boolean;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ nullable: true })
  @ApiProperty()
  bg: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: string;
}
