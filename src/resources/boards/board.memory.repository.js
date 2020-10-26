const DB = require('../../common/db');
const Board = require('./board.model');

const create = async boardData => DB.addEntity(Board, boardData);

const getAll = async () => DB.getAllEntities(Board);

const getById = async id => DB.getEntityById(Board, id);

const deleteById = async id => DB.removeEntityById(Board, id);

const updateById = async (id, boardData) =>
  DB.updateEntityById(Board, id, boardData);

module.exports = { getAll, getById, create, deleteById, updateById };
