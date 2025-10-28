const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/graphql', (req, res) => {
  res.send('Hello from GraphQL!');
});

module.exports = app;
module.exports.handler = serverless(app);
