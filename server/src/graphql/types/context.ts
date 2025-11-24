import { Db } from "mongodb";

export interface GraphQLContext {
  user: {
    username: string;
    email: string;
  } | null;
  db: Db
}