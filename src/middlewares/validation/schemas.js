const Joi = require('joi');
const UUID_VERSION = 'uuidv4';

const schemas = {
  id: Joi.object({
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  }),
  taskParams: Joi.object({
    taskId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required(),
    boardId: Joi.string().guid({ version: UUID_VERSION })
  }),
  boardParams: Joi.object({
    boardId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  })
};

module.exports = schemas;
