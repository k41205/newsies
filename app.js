const express = require('express');
const newspaperRouter = require('./routes/newspaperRoutes');
const app = express();

app.use(express.json());

// Allows CORS requests, only for devpurposes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/api/v1/newspapers', newspaperRouter);

module.exports = app;
