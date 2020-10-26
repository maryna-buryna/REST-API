const DB = require('../../common/db');
const TABLE_NAME = 'Users';
const User = require('./user.model');

const create = async userData => DB.addEntity(User, userData);

const getAll = async () => DB.getAllEntities(User);

const getById = async id => DB.getEntityById(User, id, TABLE_NAME);

const deleteById = async id => DB.removeEntityById(User, id, TABLE_NAME);

const updateById = async (id, userData) =>
  DB.updateEntityById(User, id, userData, TABLE_NAME);

module.exports = { getAll, getById, create, deleteById, updateById };
