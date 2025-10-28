// import express from "express";
// import { ApolloServer } from "@apollo/server";
// import serverless from "serverless-http";
// import cors from "cors";
// import bodyParser from "body-parser";
// import { schema } from "./graphql/schema.js";
// import { context } from "./graphql/context.js";
// import { connectDB } from "./mongo.js";
// import { expressMiddleware } from '@as-integrations/express4'
// import dotenv from "dotenv";
//
// dotenv.config();
// console.log("✅ dotenv loaded");
// await connectDB();
// console.log("✅ MongoDB connected");
//
//
// const app = express();
// const server = new ApolloServer({ ...schema });
//
// await server.start();
// console.log("✅ Apollo Server started");
//
// app.use(
//   "/graphql",
//   cors(),
//   bodyParser.json(),
//   expressMiddleware(server, { context })
// );
//
// export const handler = serverless(app);

import express from "express";
import { ApolloServer } from "@apollo/server";
import cors from "cors";
import { json } from "body-parser";
import { schema } from "./graphql/schema.js";
import { context } from "./graphql/context.js";
import { expressMiddleware } from '@as-integrations/express4'

const app = express();
app.use(cors());
app.use(json());

const server = new ApolloServer(schema);
await server.start();

app.use("/graphql", expressMiddleware(server, { context }));

export default app;