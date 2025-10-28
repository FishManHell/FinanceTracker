import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Простой лог запроса
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Главный маршрут
app.get('/', (req, res) => {
  res.json({ message: '✅ Express работает на Vercel!' });
});

// Пример POST запроса
app.post('/log', (req, res) => {
  console.log('📩 Получен POST:', req.body);
  res.json({ status: 'ok', received: req.body });
});

export default app;
