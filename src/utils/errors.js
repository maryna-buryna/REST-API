const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND;
  }
}

module.exports = {
  NotFoundError
};
