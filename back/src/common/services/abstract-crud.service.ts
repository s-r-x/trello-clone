import { Injectable } from '@nestjs/common';
import {
  Model,
  Document,
  QueryFindOptions,
  QueryFindOneAndUpdateOptions,
} from 'mongoose';
import { ObjectId } from '@/typings';
import { merge } from 'lodash';

interface IOptions {
  fullDoc?: boolean;
  select?: string;
  limit?: number;
  skip?: number;
}
interface IFindAndUpdateOptions extends Pick<IOptions, 'fullDoc' | 'select'> {
  oldDoc?: boolean;
}
const defaultOpts: IOptions = {
  fullDoc: false,
};
const defaultFindAndUpdateOpts: IFindAndUpdateOptions = {
  fullDoc: false,
  oldDoc: false,
};
@Injectable()
export abstract class AbstractCRUDService<T extends Document> {
  protected model: Model<T>;

  private constructFindAndUpdateOptions(
    userOpts: IFindAndUpdateOptions,
  ): QueryFindOneAndUpdateOptions {
    const opts = merge(userOpts, defaultFindAndUpdateOpts);
    return {
      lean: !opts.fullDoc,
      select: opts.select,
      new: !opts.oldDoc,
    };
  }
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
  public async findByIdAndUpdate(
    id: any,
    updates: any,
    opts?: IFindAndUpdateOptions,
  ) {
    return this.model.findById(
      id,
      updates,
      this.constructFindAndUpdateOptions(opts),
    );
  }
  public async findOneAndUpdate(
    id: any,
    updates: any,
    opts?: IFindAndUpdateOptions,
  ) {
    return this.model.findOne(
      id,
      updates,
      this.constructFindAndUpdateOptions(opts),
    );
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
  public async deleteById(id: ObjectId): Promise<any> {
    return this.model.deleteOne({ _id: id });
  }
}
