import { Db } from "mongodb";
import type { Request, Response } from "express";

export interface GraphQLContext {
  user: {
    username: string;
    id: string;
  } | null;
  db: Db;
  req: Request;
  res: Response;
}