import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { register } from '@/graphql/resolvers/register/register.js'
import jwt from 'jsonwebtoken'
import { GraphQLErrorCode, HttpStatus, throwError } from '@/utils/errors.js'
import { GraphQLError } from 'graphql'
import { User } from '@/models/User/User.js'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose';




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

// const hello = (_parent: any, _args: any, context: any) => {
//   return `Debug: ${JSON.stringify(context)}`;
// };

const hello = async (_parent: any, _args: any, context: any) => {
  try {
    if (!context.user) {
      const err = new Error("Unauthorized");
      (err as any).extensions = { code: "UNAUTHORIZED" };
      throw err;
    }
    return `Hello ${context.user.username}!`;
  } catch (err) {
    console.error("Ошибка в hello:", err);
    // вместо throw — возвращаем null или валидный объект ошибки
    // чтобы serverless не падал
    throw err; // Apollo поймает и вернёт клиенту
  }
};
// с этим вариантом работает

interface LoginArgs {
  username: string;
  password: string;
}

interface AuthPayload {
  token: string;
}
/////////
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB (){
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error('MONGO_URI is missing');
    cached.promise = mongoose.connect(MONGO_URI).then(m => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
///////////

const generateToken = (payload: object) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return jwt.sign(payload, secret, { expiresIn: '5m' });
};

const login = async (_: undefined, { username, password }: LoginArgs): Promise<AuthPayload> => {
  // 1️⃣ Найти пользователя в БД
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw new GraphQLError('User not found', {
      extensions: { code: 'NOT_FOUND', http: { status: 404 } },
    });
  }

  // 2️⃣ Проверить пароль
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new GraphQLError('Invalid password', {
      extensions: { code: 'BAD_REQUEST', http: { status: 400 } },
    });
  }

  // 3️⃣ Сгенерировать JWT
  const token = generateToken({ id: user._id, username: user.username });

  return { token };
};

// -----------------------------
// Apollo GraphQL
// -----------------------------
const typeDefs = `#graphql
  type AuthPayload {
    token: String!
  }

  type Query {
    hello: String
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
  // Query: {
  //   hello: () => 'Hello from Apollo + Express + Vercel!',
  // },

  Query: {
    hello
  },
  Mutation: {
    // login,
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
        await connectDB() // mongoDB
        const authHeader = req.headers.authorization || "";
        if (!authHeader.startsWith("Bearer ")) return { user: null };

        const token = authHeader.replace("Bearer ", "").trim();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.warn("JWT_SECRET не найден!");
          return { user: null };
        }

        try {
          const user = jwt.verify(token, secret) as UserPayload;
          return { user };
        } catch (err) {
          console.warn("Ошибка JWT:", err);
          return { user: null };
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
