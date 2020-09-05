import { ObjectId } from "@/typings";

export interface ITokenPayload {
  sub: ObjectId;
  login: string;
}