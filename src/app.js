const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const rootRouter = require('./router');
const logger = require('./middlewares/logger');
const errorLogger = require('./middlewares/errorLogger');

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// const promise = new Promise((resolve, reject) => {
//   return reject('TEST : Custom "UnhandledRejection" error');
// });

app.use(logger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', rootRouter);

app.use(errorLogger);

process.on('uncaughtException', err => {
  console.error(`Ooops: ${err.message}`);
});

process.on('unhandledRejection', err => {
  console.error(`Ooops UnhandledRejection : ${err}`);
});

module.exports = app;
