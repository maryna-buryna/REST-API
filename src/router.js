const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const authorization = require('./services/authorization');
const checkToken = require('./middlewares/authotization/checkToken');

const rootRouter = require('express').Router();

rootRouter.post('/login', authorization);

rootRouter.use('/users', checkToken, userRouter);
rootRouter.use('/boards', checkToken, boardRouter);
boardRouter.use('/:boardId/tasks', checkToken, taskRouter);

module.exports = rootRouter;
