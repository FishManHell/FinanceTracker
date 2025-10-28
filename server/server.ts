import express, { Request, Response } from "express";
import serverless from "serverless-http";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the server");
});

export const handler = serverless(app);
