const Task = require('./task.model');
const taskRepo = require('./task.memory.repository');
const boardRepo = require('../boards/board.memory.repository');

const createOnBoard = async (boardId, data) => {
  const board = await boardRepo.getById(boardId);
  if (board) {
    const newTask = { ...data, boardId };
    return await taskRepo.create(newTask);
  }
};

const getAllByUserId = async userId => {
  const tasks = await taskRepo.getAllByUserId(userId);
  return tasks.map(Task.toResponse);
};

const getAllByBoardId = async boardId => taskRepo.getAllByBoardId(boardId);

const getByIdOnBoard = async (boardId, taskId) =>
  taskRepo.getByIdOnBoard(boardId, taskId);

const updateById = async (boardId, taskId, taskData) => {
  const task = await getByIdOnBoard(boardId, taskId);
  if (task) {
    const newTaskData = { ...taskData, boardId };
    return taskRepo.updateById(taskId, newTaskData);
  }
};

const deleteById = async (boardId, taskId) =>
  taskRepo.deleteById(boardId, taskId);

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  createOnBoard,
  getByIdOnBoard,
  deleteById,
  updateById
};
