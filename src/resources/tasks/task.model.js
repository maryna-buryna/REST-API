const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TASK',
    order = '0',
    description,
    userId,
    boardId,
    columnId
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(user) {
    const { id, title, order, description, userId, boardId, columnId } = user;

    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    };
  }

  static fromRequest(data) {
    return new Task(data);
  }
}

module.exports = Task;
