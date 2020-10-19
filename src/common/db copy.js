const deepClone = require('../utils/deepClone');
const { NotFoundError } = require('../utils/errors');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

const getAllEntities = tableName => {
  const entries = DB[tableName];
  return deepClone(entries);
};

const getEntityById = (tableName, id) => {
  const entry = DB[tableName].filter(entity => entity.id === id);

  if (entry.length === 0) {
    throw new NotFoundError(
      `Entity with id: ${id} has not been found in table: ${tableName}`
    );
  }

  return deepClone(entry[0]);
};

const addEntity = (tableName, data) => {
  DB[tableName].push(data);
  return getEntityById(tableName, data.id);
};

const updateEntityById = (tableName, id, newData) => {
  const entryIndex = DB[tableName].findIndex(entry => entry.id === id);
  if (entryIndex === -1) {
    throw new NotFoundError(
      `Entity with id: ${id} has not been found in table: ${tableName}`
    );
  }

  DB[tableName][entryIndex] = newData;
  return getEntityById(tableName, id);
};

const removeEntityById = (tableName, id) => {
  const entryIndex = DB[tableName].findIndex(entry => entry.id === id);
  if (entryIndex === -1) {
    throw new NotFoundError(
      `Entity with id: ${id} has not been found in table: ${tableName}`
    );
  }

  DB[tableName].splice(entryIndex, 1);
  return id;
};

module.exports = {
  addEntity,
  getEntityById,
  getAllEntities,
  removeEntityById,
  updateEntityById
};
