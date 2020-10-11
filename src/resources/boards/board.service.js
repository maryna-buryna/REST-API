const Board = require('./board.model');
const boardRepo = require('./board.memory.repository');

const create = async data => {
  const boardData = new Board(data);
  const newBoard = await boardRepo.create(boardData);
  if (!newBoard) {
    throw 'We have an issue with creation new board. Could you please try again';
  }
  return Board.toResponse(newBoard);
};

const getAll = async () => {
  const boards = await boardRepo.getAll();
  return boards.map(Board.toResponse);
};

const getById = async id => {
  const board = await boardRepo.getById(id);
  return Board.toResponse(board);
};

const updateById = (id, boardData) => boardRepo.updateById(id, boardData);
const deleteById = id => boardRepo.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
