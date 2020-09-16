import { Injectable } from '@nestjs/common';
import {
  Model,
  Document,
  QueryFindOptions,
  QueryFindOneAndUpdateOptions,
  QueryFindOneAndRemoveOptions,
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
interface IFindAndDeleteOptions extends Pick<IOptions, 'select'> {}
const defaultOpts: IOptions = {
  fullDoc: false,
};
const defaultFindAndUpdateOpts: IFindAndUpdateOptions = {
  fullDoc: false,
  oldDoc: false,
};
const defaultFindAndDeleteOptions = {};
@Injectable()
export abstract class AbstractCRUDService<T extends Document> {
  protected model: Model<T>;

  private constructFindAndDeleteOptions(
    userOpts: IFindAndDeleteOptions,
  ): QueryFindOneAndRemoveOptions {
    const opts = merge(userOpts, defaultFindAndDeleteOptions);
    return {
      select: opts.select,
    };
  }
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
    this.model.remove
    return this.model.find(query, '', this.constructOptions(opts));
  }
  public async findOne(query?: any, opts?: IOptions) {
    return this.model.findOne(query, '', this.constructOptions(opts));
  }
  public async findById(id: any, opts?: IOptions) {
    return this.findOne({ _id: id }, opts);
  }
  public async updateById(id: any, updates: any) {
    await this.model.updateOne({ _id: id }, updates);
  }
  public async findByIdAndUpdate(
    id: any,
    updates: any,
    opts?: IFindAndUpdateOptions,
  ) {
    return this.findOneAndUpdate({ _id: id }, updates, opts);
  }
  public async findOneAndDelete(query: any, opts?: IFindAndDeleteOptions) {
    return this.model.findOneAndDelete(
      query,
      this.constructFindAndDeleteOptions(opts),
    );
  }
  public async findByIdAndDelete(id: any, opts?: IFindAndDeleteOptions) {
    return this.model.findOneAndDelete({ _id: id }, opts);
  }
  public async findOneAndUpdate(
    query: any,
    updates: any,
    opts?: IFindAndUpdateOptions,
  ) {
    return this.model.findOneAndUpdate(
      query,
      updates,
      this.constructFindAndUpdateOptions(opts),
    );
  }
  public async findByIds(ids: any[], opts?: IOptions) {
    return this.findMany(
      // @ts-ignore
      {
        _id: {
          $in: ids,
        },
      },
      opts,
    );
  }
  public async isExists(condition: any) {
    return this.model.exists(condition);
  }
  public async create(data: any) {
    return this.model.create(data);
  }
  public async deleteById(id: ObjectId) {
    return this.model.deleteOne({ _id: id });
  }
  public async deleteMany(query: any) {
    return this.model.deleteMany(query);
  }
}
