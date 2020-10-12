const Task = require('./task.model');
const taskRepo = require('./task.memory.repository');

const createOnBoard = async (boardId, data) => {
  const taskData = new Task({ ...data, boardId });
  const newTask = await taskRepo.create(taskData);
  if (!newTask) {
    throw Error(
      'We have an issue with creation new board. Could you please try again'
    );
  }
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

  if (!task) {
    throw Error(
      `There's no task with id: ${taskId} on board with id ${boardId}`
    );
  }

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
