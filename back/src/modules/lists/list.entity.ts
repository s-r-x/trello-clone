import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Board } from '@/modules/boards/board.entity';

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  slot: number;

  @Column()
  @ApiProperty()
  title: string;

  @OneToOne(() => Board)
  @ApiProperty()
  board: Board;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: string;
}
