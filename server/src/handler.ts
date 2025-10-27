import express from "express";
import { ApolloServer } from "@apollo/server";
import serverless from "serverless-http";
import cors from "cors";
import bodyParser from "body-parser";
import { schema } from "./graphql/schema.js";
import { context } from "./graphql/context.js";
import { connectDB } from "./mongo.js";
import { expressMiddleware } from '@as-integrations/express4'
import dotenv from "dotenv";

dotenv.config();
await connectDB();

const app = express();
const server = new ApolloServer({ ...schema });

await server.start();

app.use(
  "/graphql",
  cors(),
  bodyParser.json(),
  expressMiddleware(server, { context })
);

export const handler = serverless(app);
