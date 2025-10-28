import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import cors from 'cors';
import { json } from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// 1️⃣ Определяем типы и резолверы
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

// 2️⃣ Создаём Apollo сервер
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// ⚠️ В Apollo v5 НЕ нужно вызывать server.start() — он делает это сам.

// 3️⃣ Подключаем middleware
app.use(
  '/graphql',
  expressMiddleware(server, {
    context: async ({ req }) => ({
      token: req.headers.authorization || null,
    }),
  })
);

// 4️⃣ Обычный эндпоинт для проверки
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express + Apollo v5 + Vercel!' });
});

export default app;
