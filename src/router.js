const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const rootRouter = require('express').Router();

boardRouter.use('/:boardId/tasks', taskRouter);

rootRouter.use('/users', userRouter);
rootRouter.use('/boards', boardRouter);

module.exports = rootRouter;
