import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000
};

let client: MongoClient | null = null;

export function getClient() {
  if (!client) {
    const uri = process.env.MY_MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is missing');
    }
    client = new MongoClient(uri, options);
    attachDatabasePool(client);
  }
  return client;
}