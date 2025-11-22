import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import jwt from 'jsonwebtoken'
import client from './src/mongodb.js'
import { typeDefs } from './src/graphql/typeDefs/typeDefs.js'
import { resolvers } from './src/graphql/resolvers/index.js'

dotenv.config();

type UserPayload = {
  username: string;
  email: string;
};

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

// const resolvers = {
//   Query: {
//     hello
//   },
//   Mutation: {
//     login,
//   //   register
//   },
// };

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
