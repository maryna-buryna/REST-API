const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { logger } = require('../common/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
  if (err.status) {
    logger.error(`${err.status}: ${err.message}`);
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  } else {
    logger.error(err.message);
    res
      .status(INTERNAL_SERVER_ERROR)
      .send('Sorry, servise is not responding. Try again later');
  }
};

module.exports = errorHandler;
