import express, {Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

const server = new ApolloServer({
  typeDefs: `type Query { hello: String }`,
  resolvers: { Query: { hello: () => "world" } },
});

const ready = server.start().then(() => {
  app.use("/graphql", expressMiddleware(server));
  app.get("/", (req, res) => {
    res.json({ message: "Hello from Apollo Server on Vercel!" });
  });
});

export default async function handler(req: Request, res: Response) {
  await ready;
  return app(req, res);
}
