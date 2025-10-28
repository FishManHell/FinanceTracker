import express, {RequestHandler} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { hello } from '@/graphql/resolvers/hello/hello.js'
import { login } from '@/graphql/resolvers/login/login.js'
import { register } from '@/graphql/resolvers/register/register.js'
import { context } from '@/graphql/context.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: '✅ Express работает на Vercel!' });
});

app.post('/log', (req, res) => {
  console.log('📩 Получен POST:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// -----------------------------
// Apollo GraphQL
// -----------------------------
const typeDefs = `#graphql
  type AuthPayload {
    token: String!
  }

  type Query {
    hello: String
  }
  
  type User { 
    id: ID!
    username: String!
    email: String!
  }

  type Mutation {
    login(username: String!, password: String!): AuthPayload!
    register(username: String!, email: String!, password: String!): AuthPayload!
  }
`;
//
const resolvers = {
  // Query: {
  //   hello: () => 'Hello from Apollo + Express + Vercel!',
  // },

  Query: {
    hello
  },
  // Mutation: {
  //   login,
  //   register
  // },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

let apolloMiddleware: RequestHandler;

// обёртка lazy init
async function getApolloMiddleware() {
  if (!apolloMiddleware) {
    await apolloServer.start(); // safe lazy start
    // apolloMiddleware = expressMiddleware(apolloServer, {
    //   context: async ({ req }) => ({ token: req.headers.authorization || null }),
    // });
    apolloMiddleware = expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        try {
          return await context({ req });
        } catch (err) {
          // ApolloServer ожидает GraphQLContext, даже если пользователь не авторизован
          return { user: null };
        }
      }
    });
  }
  return apolloMiddleware;
}

// прокси для serverless
app.use('/graphql', async (req, res, next) => {
  const middleware = await getApolloMiddleware();
  return middleware(req, res, next);
});

export default app;
