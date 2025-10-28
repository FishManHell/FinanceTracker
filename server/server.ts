import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

async function initApollo() {
  const server = new ApolloServer({
    typeDefs: `type Query { hello: String }`,
    resolvers: { Query: { hello: () => "world" } },
  });

  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.get("/", (req, res) => {
    res.json({ message: "Hello from Apollo Server on Vercel!" });
  });
}

initApollo();

export default app;
