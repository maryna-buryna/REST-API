const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Will add the UUID type to the Mongoose Schema types
// require('mongoose-uuid2')(mongoose);
// var UUID = mongoose.Types.UUID;

const UserSchema = new Schema(
  {
    _id: { type: String, default: uuidv4, unique: true },
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
  const { _id: id, name, login } = user;
  return { id, name, login };
};

UserSchema.statics.fromRequest = user => {
  const { name, login, password } = user;
  return { name, login, password };
};

module.exports = mongoose.model('User', UserSchema);
