const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const create = async data => usersRepo.create(data);

const getAll = async () => usersRepo.getAll();

const getById = async id => usersRepo.getById(id);

const getByLogin = async login => usersRepo.getByLogin(login);

const updateById = async (id, userData) => usersRepo.updateById(id, userData);

const deleteById = async id => {
  const allTasks = await taskRepo.getAllByUserId(id);
  const promises = allTasks.map(entry =>
    taskRepo.updateById(entry.id, { ...entry, userId: null })
  );

  await Promise.all(promises);
  return usersRepo.deleteById(id);
};

module.exports = {
  create,
  getAll,
  getById,
  getByLogin,
  updateById,
  deleteById
};
