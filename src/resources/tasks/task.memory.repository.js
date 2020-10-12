const DB = require('../../common/db');
const TABLE_NAME = 'Tasks';

const create = async taskData => DB.addEntity(TABLE_NAME, taskData);

const getAllByBoardId = async boardId => {
  const allTasks = DB.getAllEntities(TABLE_NAME) || [];
  return allTasks.filter(task => task.boardId === boardId);
};

const getAllByUserId = async userId => {
  const allTasks = DB.getAllEntities(TABLE_NAME) || [];
  return allTasks.filter(task => task.userId === userId);
};

const getByIdOnBoard = async (boardId, taskId) => {
  const task = DB.getEntityById(TABLE_NAME, taskId);
  return task.boardId === boardId ? task : null;
};

const deleteById = async (boardId, taskId) => {
  const task = DB.getEntityById(TABLE_NAME, taskId);
  if (task.boardId === boardId) {
    DB.removeEntityById(TABLE_NAME, taskId);
  }
};

const updateById = async (id, data) =>
  DB.updateEntityById(TABLE_NAME, id, data);

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  create,
  getByIdOnBoard,
  deleteById,
  updateById
};
