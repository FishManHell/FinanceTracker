import { MongoClient, MongoClientOptions } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';

const options: MongoClientOptions = {
  appName: "devrel.vercel.integration",
  maxIdleTimeMS: 5000
};

const uri = "mongodb+srv://Vercel-Admin-financeTracker:XgD8MUiWTwxJtjer@financetracker.zuhnavw.mongodb.net/?retryWrites=true&w=majority"
if (!uri) {
  throw new Error('MongoDB URI is missing');
}

const client = new MongoClient(uri, options);

// console.log("[MongoDB] Initializing client...");
//
// // События клиента
// client.on('commandStarted', (event) => {
//   console.log(`[MongoDB] Command started: ${event.commandName}`);
// });
//
// client.on('commandSucceeded', (event) => {
//   console.log(`[MongoDB] Command succeeded: ${event.commandName}`);
// });
//
// client.on('commandFailed', (event) => {
//   console.error(`[MongoDB] Command failed: ${event.commandName}`, event.failure);
// });

// Attach the client to ensure proper cleanup on function suspension
attachDatabasePool(client);

// Export a module-scoped MongoClient to ensure the client can be shared across functions.
export default client;