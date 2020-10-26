const { createLogger, format, transports } = require('winston');
const { combine, label: winstonLabel, printf, colorize, simple } = format;

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
  level: 'info',
  format: combine(winstonLabel({ label: 'REQ' }), colorize(), reqLogFormat),
  transports: [new transports.Console()]
});

const resLogger = createLogger({
  level: 'info',
  format: combine(winstonLabel({ label: 'RES' }), colorize(), resLogFormat),
  transports: [new transports.Console()]
});

const logger = createLogger({
  format: combine(colorize(), simple()),
  transports: [
    new transports.Console({
      level: 'info'
    }),
    new transports.Console({
      level: 'error'
    })
  ]
});

module.exports = { reqLogger, resLogger, logger };
