import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from '@/graphql/typeDefs/typeDefs.js'
import { resolvers } from '@/graphql/resolvers/index.js'
import { context } from '@/graphql/context.js'

dotenv.config();

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

app.post('/log', (req, res) => {
  console.log('📩 Получен POST:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// -----------------------------
// Apollo GraphQL
// -----------------------------
// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;
//
// const resolvers = {
//   Query: {
//     hello: () => 'Hello from Apollo + Express + Vercel!',
//   },
// };

const apolloServer = new ApolloServer({ typeDefs, resolvers });

let apolloMiddleware: RequestHandler;

// обёртка lazy init
async function getApolloMiddleware() {
  if (!apolloMiddleware) {
    await apolloServer.start(); // safe lazy start
    apolloMiddleware = expressMiddleware(apolloServer, {
      context,
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
