import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import {getApolloMiddleware} from "./apollo.js"

dotenv.config();

const app = express();

app.use(cors({
  origin: [process.env.CORS_BASE_URL!],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(graphqlUploadExpress());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: '✅ Express Server is running' });
});

app.use('/graphql', async (req, res, next) => {
  const middleware = await getApolloMiddleware();
  return middleware(req, res, next);
});


export default app;
