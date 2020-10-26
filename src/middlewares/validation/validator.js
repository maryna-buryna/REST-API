const createHttpError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');

const validator = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    const errorsDetails = error.details.map(({ message }) => message);
    throw new createHttpError(BAD_REQUEST, errorsDetails.toString());
  }
  next();
};

module.exports = validator;
