const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');

router.route('/').get(async (req, res, next) => {
  try {
    const allTaskInBoard = await taskService.getAllByBoardId(
      req.params.boardId
    );
    res.json(allTaskInBoard);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newTask = await taskService.createOnBoard(
      req.params.boardId,
      req.body
    );
    res.json(newTask);
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').get(async (req, res, next) => {
  try {
    const { taskId, boardId } = req.params;
    const task = await taskService.getByIdOnBoard(boardId, taskId);
    res.json(task);
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').delete(async (req, res, next) => {
  try {
    const { taskId, boardId } = req.params;
    const taskData = await taskService.deleteById(boardId, taskId);
    res.json(taskData);
  } catch (err) {
    return next(err);
  }
});

router.route('/:taskId').put(async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.updateById(taskId, req.body);
    res.json(task);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
