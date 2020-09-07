import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';

@Injectable()
export abstract class AbstractCRUDService<T extends Document> {
  protected model: Model<T>;

  public async findMany(query?: any) {
    return this.model.find(query);
  }
  public async findById(id: any) {
    return this.model.findById(id);
  }
  public async isExists(condition: any) {
    return this.model.exists(condition);
  }
  public async create(data: any) {
    const entity = await this.model.create(data);
    return entity;
  }
}
