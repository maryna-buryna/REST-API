const createHttpError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');

const getAllBy = async (Model, findBy, value) => {
  const enties = await Model.find({ [findBy]: value });
  return enties.map(entry => Model.toResponse(entry));
};

const getAllEntities = async Model => {
  const enties = await Model.find({});
  return enties.map(entry => Model.toResponse(entry));
};

const getEntityById = async (Model, id) => {
  const entry = await Model.findById(id);
  if (!entry) {
    throw new createHttpError(
      NOT_FOUND,
      `Entity with id: ${id} has not been found.`
    );
  }
  return Model.toResponse(entry);
};

const addEntity = async (Model, data) => {
  const entryData = Model.fromRequest(data);
  const entry = await Model.create(entryData);
  return Model.toResponse(entry);
};

const updateEntityById = async (Model, id, newData) => {
  const entryData = Model.fromRequest(newData);
  const entry = await Model.findByIdAndUpdate(id, entryData);
  if (!entry) {
    throw new createHttpError(
      NOT_FOUND,
      `Entity with id: ${id} has not been found.`
    );
  }
  return Model.toResponse(entry);
};

const removeEntityById = async (Model, id) => {
  const entry = await Model.findByIdAndDelete(id);

  if (!entry) {
    throw new createHttpError(
      NOT_FOUND,
      `Entity with id: ${id} has not been found.`
    );
  }

  return entry._id;
};

module.exports = {
  addEntity,
  getAllBy,
  getEntityById,
  getAllEntities,
  removeEntityById,
  updateEntityById
};
