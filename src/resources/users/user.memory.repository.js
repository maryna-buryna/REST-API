const userDB = require('./userDB');

const create = async userData => userDB.createUser(userData);

const getAll = async () => userDB.getAllUsers();

const getById = async id => userDB.getUserById(id);

const deleteById = async id => userDB.deleteUserById(id);

const updateById = async (id, userData) => userDB.updateUserById(id, userData);

module.exports = { getAll, getById, create, deleteById, updateById };
