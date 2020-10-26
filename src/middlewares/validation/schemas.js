const Joi = require('joi');
const UUID_VERSION = 'uuidv4';

const schemas = {
  id: Joi.object({
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  })
};

module.exports = schemas;
