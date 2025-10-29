import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { login } from '@/graphql/resolvers/login/login.js'
import { register } from '@/graphql/resolvers/register/register.js'
import jwt from 'jsonwebtoken'



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
  //   login,
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
