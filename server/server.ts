import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!', env: process.env.NODE_ENV });
});

export default app;
