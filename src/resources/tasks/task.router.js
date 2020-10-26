const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const validator = require('../../middlewares/validation/validator');
const schemas = require('../../middlewares/validation/schemas');

router
  .route('/')
  .get(validator(schemas.boardParams, 'params'), async (req, res) => {
    const allTaskInBoard = await taskService.getAllByBoardId(
      req.params.boardId
    );
    res.json(allTaskInBoard);
  });

router
  .route('/')
  .post(validator(schemas.boardParams, 'params'), async (req, res) => {
    const newTask = await taskService.createOnBoard(
      req.params.boardId,
      req.body
    );
    res.json(newTask);
  });

router
  .route('/:taskId')
  .get(validator(schemas.taskParams, 'params'), async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await taskService.getByIdOnBoard(boardId, taskId);
    console.log('-----', task);
    res.json(task);
  });

router
  .route('/:taskId')
  .delete(validator(schemas.taskParams, 'params'), async (req, res) => {
    const { taskId, boardId } = req.params;
    const taskData = await taskService.deleteById(boardId, taskId);
    res.json(taskData);
  });

router
  .route('/:taskId')
  .put(validator(schemas.taskParams, 'params'), async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.updateById(boardId, taskId, req.body);
    res.json(task);
  });

module.exports = router;
