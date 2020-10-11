const DB = require('../../common/db');
const TABLE_NAME = 'Users';

const create = async userData => DB.addEntity(TABLE_NAME, userData);

const getAll = async () => DB.getAllEntities(TABLE_NAME);

const getById = async id => DB.getEntityById(TABLE_NAME, id);

const deleteById = async id => DB.removeEntityById(TABLE_NAME, id);

const updateById = async (id, userData) =>
  DB.updateEntityById(TABLE_NAME, id, userData);

module.exports = { getAll, getById, create, deleteById, updateById };
