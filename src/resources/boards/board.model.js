const mongoose = require('mongoose');
const { Schema } = mongoose;
const uuidv4 = require('uuid/v4');

const BoardSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    title: { type: String, required: true },
    columns: [{ type: Object }]
  },
  {
    collection: 'boards'
  }
);

BoardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return {
    id,
    title,
    columns
  };
};

BoardSchema.statics.fromRequest = async board => {
  const { title, columns } = board;
  return { title, columns };
};

module.exports = mongoose.model('Board', BoardSchema);
