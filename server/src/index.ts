import dotenv from "dotenv";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './mongo.js'
import { schema } from './graphql/schema.js'
import { context } from './graphql/context.js'

dotenv.config();
connectDB();
const server = new ApolloServer(schema);
const { url } = await startStandaloneServer(server, { listen: { port: 8000 }, context });

console.log(`Server ready at ${url}`);