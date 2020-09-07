import { Injectable } from '@nestjs/common';
import { Model, Document, QueryFindOptions } from 'mongoose';
import { ObjectId } from '@/typings';
import { merge } from 'lodash';

interface IOptions {
  fullDoc?: boolean;
  select?: string;
  limit?: number;
  skip?: number;
}
const defaultOpts: IOptions = {
  fullDoc: false,
};
@Injectable()
export abstract class AbstractCRUDService<T extends Document> {
  protected model: Model<T>;

  private constructOptions(userOpts: IOptions): QueryFindOptions {
    const opts = merge(userOpts, defaultOpts);
    return {
      lean: !opts.fullDoc,
      projection: opts.select,
    };
  }
  public async findMany(query?: any, opts?: IOptions) {
    return this.model.find(query, '', this.constructOptions(opts));
  }
  public async findOne(query?: any, opts?: IOptions) {
    return this.model.findOne(query, '', this.constructOptions(opts));
  }
  public async findById(id: any, opts?: IOptions) {
    return this.model.findById(id, '', this.constructOptions(opts));
  }
  public async findByIds(ids: any[], opts?: IOptions) {
    return this.model.find(
      // @ts-ignore
      {
        _id: {
          $in: ids,
        },
      },
      '',
      this.constructOptions(opts),
    );
  }
  public async isExists(condition: any) {
    return this.model.exists(condition);
  }
  public async create(data: any) {
    const entity = await this.model.create(data);
    return entity;
  }
  public async deleteById(id: ObjectId) {
    return this.model.deleteOne({ _id: id });
  }
}
