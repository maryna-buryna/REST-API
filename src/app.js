const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
require('express-async-errors');
const rootRouter = require('./router');
const requestLogger = require('./middlewares/requestLogger');
const errorHandler = require('./middlewares/errorHandler');

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

const app = express();

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(requestLogger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/', rootRouter);
app.use(errorHandler);

module.exports = app;
