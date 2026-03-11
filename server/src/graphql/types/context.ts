import { Db } from "mongodb";
import type { Request, Response } from "express";
import { Role } from '../../models/User/user.types.js'

export interface ContextUser {
  username: string;
  id: string;
  role: Role
}

export interface GraphQLContext {
  user: ContextUser | null;
  db: Db;
  req: Request;
  res: Response;
}