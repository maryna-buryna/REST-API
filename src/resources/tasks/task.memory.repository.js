const DB = require('../../common/db');
const Task = require('./task.model');
const createHttpError = require('http-errors');
const { NOT_FOUND } = require('http-status-codes');

const create = async taskData => DB.addEntity(Task, taskData);

const getAllByBoardId = async boardId =>
  DB.getAllBy(Task, 'boardId', boardId) || [];

const getAllByUserId = async userId =>
  DB.getAllBy(Task, 'userId', userId) || [];

const getByIdOnBoard = async (boardId, taskId) => {
  const entry = await Task.findOne({ boardId, _id: taskId });
  if (!entry) {
    throw new createHttpError(
      NOT_FOUND,
      `Task with id: ${taskId} has not been found on board ${boardId}.`
    );
  }

  return Task.toResponse(entry);
};

const deleteById = async (boardId, taskId) => {
  const entry = await Task.findOneAndDelete({ boardId, _id: taskId });
  if (!entry) {
    throw new createHttpError(
      NOT_FOUND,
      `Task with id: ${taskId} has not been found on board ${boardId}.`
    );
  }
  return taskId;
};

const updateById = async (id, taskData) =>
  DB.updateEntityById(Task, id, taskData);

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  create,
  getByIdOnBoard,
  deleteById,
  updateById
};
