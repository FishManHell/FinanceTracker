import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { json } from 'body-parser';

// Простой GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Простой resolver
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo + Express + Vercel!',
  },
};

// Создаём сервер Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Создаём Express app
const app = express();
app.use(cors());
app.use(json());

// Подключаем Apollo middleware
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization || null,
    }),
  })
);

// Тестовый GET маршрут
app.get('/', (req, res) => {
  res.json({ message: '✅ Express + Apollo v5 working on Vercel!' });
});

// Экспортируем app (для Vercel важно!)
export default app;
