const { finished } = require('stream');
const { reqLogger, resLogger } = require('../common/logger');

const reqLoggerMiddleware = (req, res, next) => {
  const { method, url, query, body } = req;
  const start = new Date();

  reqLogger.info({
    body: JSON.stringify(body),
    query: JSON.stringify(query),
    method,
    url
  });

  finished(res, () => {
    const ms = new Date() - start;
    const { statusCode } = res;
    resLogger.info({
      method: method.toUpperCase(),
      ms,
      statusCode,
      url
    });
  });

  return next();
};

module.exports = reqLoggerMiddleware;
