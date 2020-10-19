const Task = require('./task.model');
const taskRepo = require('./task.memory.repository');

const createOnBoard = async (boardId, data) => {
  const taskData = new Task({ ...data, boardId });
  const newTask = await taskRepo.create(taskData);
  return Task.toResponse(newTask);
};

const getAllByUserId = async userId => {
  const tasks = await taskRepo.getAllByUserId(userId);
  return tasks.map(Task.toResponse);
};

const getAllByBoardId = async boardId => {
  const tasks = await taskRepo.getAllByBoardId(boardId);
  return tasks.map(Task.toResponse);
};

const getByIdOnBoard = async (boardId, taskId) => {
  const task = await taskRepo.getByIdOnBoard(boardId, taskId);
  return Task.toResponse(task);
};

const updateById = async (taskId, taskData) =>
  taskRepo.updateById(taskId, Task.fromRequest({ ...taskData }));

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
