import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';

dotenv.config();

const app = express();

const server = new ApolloServer({ typeDefs: `type Query { hello: String }`, resolvers: { Query: { hello: () => 'world' } } });

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

export default app;
