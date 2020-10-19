const { finished } = require('stream');
const { createLogger, format, transports } = require('winston');
const { combine, label: winstonLabel, printf, colorize } = format;

const resLogFormat = printf(
  ({ level, label, message: { statusCode, method, url, ms } }) => {
    return `${level} [${label}]: ${statusCode} ${method.toUpperCase()}:  ${url} - [${ms}ms] `;
  }
);

const reqLogFormat = printf(
  ({ level, label, message: { method, url, query, body } }) => {
    return `${level} [${label}]: ${method.toUpperCase()} ${url}
    -> query: ${query}
    -> body: ${body}`;
  }
);

const reqLogger = createLogger({
  format: combine(winstonLabel({ label: 'REQ' }), colorize(), reqLogFormat),
  transports: [new transports.Console()]
});

const resLogger = createLogger({
  format: combine(winstonLabel({ label: 'RES' }), colorize(), resLogFormat),
  transports: [new transports.Console()]
});

const loggerMiddleware = (req, res, next) => {
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

module.exports = loggerMiddleware;
