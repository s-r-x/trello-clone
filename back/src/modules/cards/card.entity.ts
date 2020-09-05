import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { List } from '@/modules/lists/list.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  desc: string;

  @OneToOne(() => List)
  @ApiProperty()
  list: List;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: string;
}

