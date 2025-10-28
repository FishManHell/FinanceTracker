import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';

const app = express();
app.use(cors());
app.use(json());

const server = new ApolloServer({
  typeDefs: `type Query { hello: String }`,
  resolvers: { Query: { hello: () => 'world' } },
});

await server.start();

app.use('/graphql', expressMiddleware(server));

export default app;
