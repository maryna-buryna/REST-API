const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuidv4 = require('uuid/v4');

const TaskSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: String,
    order: Number,
    description: String,
    userId: {
      type: String,
      ref: 'User'
    },
    boardId: {
      type: String,
      ref: 'Board',
      required: true
    },
    columnId: String
  },
  {
    collection: 'tasks'
  }
);

TaskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

TaskSchema.statics.fromRequest = async task => {
  const { title, order, description, userId, boardId, columnId } = task;
  return {
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

module.exports = mongoose.model('Task', TaskSchema);
