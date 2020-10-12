const User = require('../users/user.model');
const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const Task = require('../tasks/task.model');

const create = async data => {
  const userData = new User(data);
  const newUser = await usersRepo.create(userData);
  return User.toResponse(newUser);
};

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(User.toResponse);
};

const getById = async id => {
  const user = await usersRepo.getById(id);
  return User.toResponse(user);
};

const updateById = async (id, userData) => {
  const newData = User.fromRequest(userData);
  return usersRepo.updateById(id, newData);
};

const deleteById = async id => {
  const allTasks = (await taskRepo.getAllByUserId(id)) || [];
  const promises = allTasks.map(entry =>
    taskRepo.updateById(entry.id, Task.fromRequest({ ...entry, userId: null }))
  );
  await Promise.all(promises);
  return usersRepo.deleteById(id);
};

module.exports = { create, getAll, getById, updateById, deleteById };
