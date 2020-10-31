const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/login/login.router');
const checkToken = require('./middlewares/authotization/checkToken');

const rootRouter = require('express').Router();

rootRouter.use('/login', loginRouter);

rootRouter.use('/users', checkToken, userRouter);
rootRouter.use('/boards', checkToken, boardRouter);
boardRouter.use('/:boardId/tasks', checkToken, taskRouter);

module.exports = rootRouter;
