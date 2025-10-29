import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { register } from '@/graphql/resolvers/register/register.js'
import jwt from 'jsonwebtoken'
// import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'
// import { GraphQLError } from 'graphql'
// import { User } from '@/models/User/User.js'
// import bcrypt from 'bcryptjs'
import client from './mongodb.js'
import {CollectionInfo} from 'mongodb'
import { GraphQLError } from 'graphql'
import bcrypt from 'bcryptjs'
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'
import { LoginArgs } from '@/graphql/resolvers/login/types/loginArgs.js'
import { getUserWithPassword } from '@/services/user/user.js'
import { verifyPassword } from '@/utils/auth.js'


dotenv.config();

type UserPayload = {
  username: string;
  email: string;
};

export interface GraphQLContext {
  user: UserPayload | null;
}

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: '✅ Express работает на Vercel!' });
});

const testMongo = async (_: any, __: any, context: any) => {
  const collections = await context.db.listCollections().toArray();
  return collections.map((c: CollectionInfo) => c.name);
};

const hello = async (_parent: any, _args: any, context: any) => {
  return "HELLO WORD!";
  // try {
  //   if (!context.user) {
  //     const err = new Error("Unauthorized");
  //     (err as any).extensions = { code: "UNAUTHORIZED" };
  //     throw err;
  //   }
  //   return `Hello ${context.user.username}!`;
  // } catch (err) {
  //   console.error("Ошибка в hello:", err);
  //   // вместо throw — возвращаем null или валидный объект ошибки
  //   // чтобы serverless не падал
  //   throw err; // Apollo поймает и вернёт клиенту
  // }
};

// const throwLoginError = (message: string) => {
//   return throwError({
//     message,
//     status: HttpStatus.NOT_FOUND,
//     code: GraphQLErrorCode.NOT_FOUND
//   })
// }

export const login = async (_: undefined, { username, password }: LoginArgs, context: any) => {
  const users = context.db.collection('users');

  const user = await users.findOne({ username });
  if (!user) throw new GraphQLError('User not found', { extensions: { code: 'NOT_FOUND', http: { status: 404 } } });

  const valid = verifyPassword(password, user.password);
  if (!valid) throw new GraphQLError('Invalid password', { extensions: { code: 'BAD_REQUEST', http: { status: 500 } } });

  const token = generateToken({id: user._id, username: user.username})
  return { token };
}

const generateToken = (payload: object) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign(payload, secret, { expiresIn: '5m' });
};

// const login = async (_: undefined, { username, password }: { username: string; password: string }, context: any) => {
//   const users = context.db.collection('users');
//
//   // Найти пользователя
//   const user = await users.findOne({ username });
//   if (!user) {
//     throw new GraphQLError('User not found', { extensions: { code: 'NOT_FOUND', http: { status: 404 } } });
//   }
//
//   // Проверить пароль
//   const valid = await bcrypt.compare(password, user.password);
//   if (!valid) {
//     throw new GraphQLError('Invalid password', { extensions: { code: 'BAD_REQUEST', http: { status: 500 } } });
//   }
//
//   // Создать JWT
//   const token = generateToken({ id: user._id, username: user.username });
//
//   return { token };
// };

// -----------------------------
// Apollo GraphQL
// -----------------------------
const typeDefs = `#graphql
  type AuthPayload {
    token: String!
  }

  type Query {
    hello: String
    testMongo: [String!]!
  }
  
  type User { 
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
  }
`;
//
const resolvers = {
  Query: {
    hello,
    testMongo
  },
  Mutation: {
    login,
  //   register
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

let apolloMiddleware: RequestHandler;

// обёртка lazy init
async function getApolloMiddleware() {
  if (!apolloMiddleware) {
    await apolloServer.start(); // safe lazy start
    apolloMiddleware = expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const db = client.db('FinanceTacker');
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) return { user: null, db };

        const token = authHeader.replace("Bearer ", "").trim();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.warn("JWT_SECRET не найден!");
          return { user: null, db };
        }

        try {
          const user = jwt.verify(token, secret) as UserPayload;
          return { user, db };
        } catch (err) {
          console.warn("Ошибка JWT:", err);
          return { user: null, db };
        }
      }
    });
  }
  return apolloMiddleware;
}

// прокси для serverless
app.use('/graphql', async (req, res, next) => {
  const middleware = await getApolloMiddleware();
  return middleware(req, res, next);
});

export default app;
