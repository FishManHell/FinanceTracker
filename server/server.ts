import express from 'express';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import { json } from 'body-parser';
import { expressMiddleware } from '@as-integrations/express4'

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const server = new ApolloServer({
  typeDefs: `type Query { hello: String }`,
  resolvers: { Query: { hello: () => 'world' } }
});

await server.start();

app.use('/graphql', expressMiddleware(server));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

export default app;
