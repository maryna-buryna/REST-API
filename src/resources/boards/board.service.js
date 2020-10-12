const Board = require('./board.model');
const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const create = async data => {
  const boardData = new Board(data);
  const newBoard = await boardRepo.create(boardData);
  if (!newBoard) {
    throw Error(
      'We have an issue with creation new board. Could you please try again'
    );
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

const updateById = async (id, boardData) =>
  boardRepo.updateById(id, Board.fromRequest(boardData));

const deleteById = async id => {
  const allTasks = (await taskRepo.getAllByBoardId(id)) || [];
  const promises = allTasks.map(entry => taskRepo.deleteById(id, entry.id));
  await Promise.all(promises);
  return boardRepo.deleteById(id);
};

module.exports = { create, getAll, getById, updateById, deleteById };
