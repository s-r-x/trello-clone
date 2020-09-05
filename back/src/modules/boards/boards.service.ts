import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(@InjectRepository(Board) private boardsRepo: Repository<Board>) {}

  public async create(data: CreateBoardDto) {
    const entity = this.boardsRepo.create(data);
    await this.boardsRepo.save(entity);
    return entity;
  }
}
