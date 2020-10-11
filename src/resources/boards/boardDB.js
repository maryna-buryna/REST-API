const deepClone = require('../../utils/deepClone');

const BoardDB = [];

const getAllBoards = async () => deepClone(BoardDB);

const getBoardById = async id => {
  const board = BoardDB.filter(boardEntry => boardEntry.id === id)[0];

  if (!board) {
    throw `Board with ${id} hs not been found!`;
  }

  return deepClone(board);
};

const createBoard = async boardData => {
  BoardDB.push(boardData);
  return getBoardById(boardData.id);
};

const updateBoardById = async (id, boardData) => {
  const currentBoard = await getBoardById(id);

  if (!currentBoard) {
    throw `User with ${id} has not been found!`;
  }

  const boardIndex = BoardDB.findIndex(board => board.id === id);
  const updatedBoard = { ...currentBoard, ...boardData, id };
  BoardDB[boardIndex] = updatedBoard;

  return getBoardById(id);
};

const deleteBoardById = async id => {
  const boardIndex = BoardDB.findIndex(user => user.id === id);
  if (boardIndex > -1) {
    BoardDB.splice(boardIndex, 1);
    return id;
  }
  throw `Board with ${id} has not been found!`;
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  updateBoardById,
  deleteBoardById
};
