import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Лог запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Главный GET маршрут
app.get('/', (req, res) => {
  res.json({ message: '✅ Express работает на Vercel!' });
});

// POST /log
app.post('/log', (req, res) => {
  console.log('📩 Получен POST:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// -----------------------------
// Apollo GraphQL
// -----------------------------
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo + Express + Vercel!',
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Подключаем Apollo middleware
app.use(
  '/graphql',
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({
      token: req.headers.authorization || null,
    }),
  })
);

export default app;
