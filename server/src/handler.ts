import express, { RequestHandler } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { connectDB } from './mongo.js';
import { schema } from './graphql/schema.js';
import { context } from './graphql/context.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Лог всех запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: '✅ Express работает!' });
});

// -----------------------------
// Apollo GraphQL через ленивый middleware
// -----------------------------
const apolloServer = new ApolloServer(schema);

let apolloMiddleware: RequestHandler;

async function getApolloMiddleware() {
  if (!apolloMiddleware) {
    await apolloServer.start();

    // Важно: context — функция, вызываемая с req для каждого запроса
    apolloMiddleware = expressMiddleware(apolloServer, {
      context: async ({ req }) => context({ req }),
    });
  }
  return apolloMiddleware;
}

// Прокси для GraphQL
app.use('/graphql', async (req, res, next) => {
  const middleware = await getApolloMiddleware();
  return middleware(req, res, next);
});

// -----------------------------
// Подключение к Mongo и запуск сервера локально
// -----------------------------
async function startServer() {
  try {
    await connectDB();
    console.log('✅ MongoDB подключена');

    // Локальный запуск для разработки
    if (process.env.NODE_ENV !== 'production') {
      const port = process.env.PORT || 8000;
      app.listen(port, () => {
        console.log(`🚀 Server ready at http://localhost:${port}`);
      });
    }
  } catch (err) {
    console.error('❌ Ошибка при запуске сервера:', err);
  }
}

startServer();

// Экспорт для Vercel serverless
export default app;
