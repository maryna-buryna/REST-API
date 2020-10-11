const usersRepo = require('./user.memory.repository');

const create = userData => usersRepo.create(userData);
const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const updateById = (id, userData) => usersRepo.updateById(id, userData);
const deleteById = id => usersRepo.deleteById(id);

module.exports = { create, getAll, getById, updateById, deleteById };
