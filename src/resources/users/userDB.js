const deepClone = require('../../utils/deepClone');

const UserDB = [];

const getAllUsers = async () => deepClone(UserDB);

const getUserById = async id => {
  const user = UserDB.filter(userEntry => userEntry.id === id)[0];

  if (!user) {
    throw `User with ${id} hs not been found!`;
  }

  return deepClone(user);
};

const createUser = async userData => {
  UserDB.push(userData);
  return getUserById(userData.id);
};

const updateUserById = async (id, userData) => {
  const currentUser = await getUserById(id);

  if (!currentUser) {
    throw `User with ${id} has not been found!`;
  }

  const userIndex = UserDB.findIndex(user => user.id === id);
  const updatedUser = { ...currentUser, ...userData, id };
  UserDB[userIndex] = updatedUser;

  return getUserById(id);
};

const deleteUserById = async id => {
  const userIndex = UserDB.findIndex(user => user.id === id);
  if (userIndex > -1) {
    UserDB.splice(userIndex, 1);
    return id;
  }
  throw `User with ${id} hs not been found!`;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
