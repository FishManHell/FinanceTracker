import { ApolloServer } from '@apollo/server';
import { RequestHandler } from 'express'
import { expressMiddleware } from '@as-integrations/express4';
import {getClient} from './mongodb.js'
import jwt from 'jsonwebtoken'
import { schema } from './graphql/schema.js'
import { UserPayload } from './graphql/types/userPayload.js'

const apolloServer = new ApolloServer(schema);

let apolloMiddleware: RequestHandler;

export async function getApolloMiddleware() {
  if (!apolloMiddleware) {
    await apolloServer.start(); // safe lazy start
    apolloMiddleware = expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const db = getClient().db("FinanceTacker");
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) return { user: null, db };

        const token = authHeader.replace("Bearer ", "").trim();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.warn("Didn't find JWT_SECRET");
          return { user: null, db };
        }

        try {
          return { user: jwt.verify(token, secret) as UserPayload, db };
        } catch (err) {
          console.warn("Error JWT:", err);
          return { user: null, db };
        }
      }
    });
  }
  return apolloMiddleware;
}