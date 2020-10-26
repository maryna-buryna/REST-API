const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const create = async boardData => boardRepo.create(boardData);

const getAll = async () => boardRepo.getAll();

const getById = async id => boardRepo.getById(id);

const updateById = async (id, boardData) => boardRepo.updateById(id, boardData);

const deleteById = async id => {
  const allTasks = await taskRepo.getAllByBoardId(id);
  const promises = allTasks.map(entry => taskRepo.deleteById(id, entry.id));
  await Promise.all(promises);

  return boardRepo.deleteById(id);
};

module.exports = { create, getAll, getById, updateById, deleteById };
