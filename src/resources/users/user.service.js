const User = require('../users/user.model');
const usersRepo = require('./user.memory.repository');

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

const updateById = (id, userData) => {
  const newData = User.fromRequest(userData);
  usersRepo.updateById(id, newData);
};

const deleteById = id => usersRepo.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
