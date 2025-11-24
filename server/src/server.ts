import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {getApolloMiddleware} from "./apollo.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.json({ message: '✅ Express Server is running' });
});

app.use('/graphql', async (req, res, next) => {
  const middleware = await getApolloMiddleware();
  return middleware(req, res, next);
});

// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 8000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
//   });
// }

export default app;
