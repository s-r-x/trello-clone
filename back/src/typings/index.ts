//import { Types } from 'mongoose';
import { Express } from 'express';

//export type ObjectId = Types.ObjectId;
export type ObjectId = any;
export type TAnyDict = {
  [key in string]: any;
};
export type TCustomSession = Express.Session & {
  userId?: ObjectId;
};
