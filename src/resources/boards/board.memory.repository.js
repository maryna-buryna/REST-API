const boardsDB = require('./boardDB');

const create = async boardData => boardsDB.createBoard(boardData);

const getAll = async () => boardsDB.getAllBoards();

const getById = async id => boardsDB.getBoardById(id);

const deleteById = async id => boardsDB.deleteBoardById(id);

const updateById = async (id, boardData) =>
  boardsDB.updateBoardById(id, boardData);

module.exports = { getAll, getById, create, deleteById, updateById };
