const createHttpError = require('http-errors');
const { UNPROCESSABLE_ENTITY, BAD_REQUEST } = require('http-status-codes');

const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    const errorsDetails = error.details.map(({ message }) => message);
    const status = property === 'body' ? UNPROCESSABLE_ENTITY : BAD_REQUEST;
    throw new createHttpError(status, errorsDetails);
  }
  next();
};

module.exports = validator;
