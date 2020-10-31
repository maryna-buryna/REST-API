const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const createHttpError = require('http-errors');
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const UserSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: {
      type: String,
      required: true,
      unique: true
    },
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: { type: String, required: true }
  },
  {
    collection: 'users'
  }
);

UserSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

UserSchema.statics.fromRequest = async user => {
  const { name, login, password } = user;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return { name, login, password: hash };
  } catch (err) {
    throw new createHttpError(
      INTERNAL_SERVER_ERROR,
      'We have some issues with creatin user. Try again later.'
    );
  }
};

module.exports = mongoose.model('User', UserSchema);
