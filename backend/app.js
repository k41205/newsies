const express = require('express');
const newspaperRouter = require('./routes/newspaperRoutes');
const app = express();

// MIDDLEWARE STACK
app.use(express.json()); // to recognize the incoming request object as a JSON object

// allows CORS requests, only for dev purposes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/v1/newspapers', newspaperRouter); // root routing

module.exports = app;
