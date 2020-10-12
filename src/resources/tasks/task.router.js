const router = require('express').Router();
const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  try {
    const allTaskInBoard = await taskService.getAllByBoardId(
      req.params.boardId
    );
    res.json(allTaskInBoard);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:boardId/tasks').post(async (req, res) => {
  try {
    const newTask = await taskService.createOnBoard(
      req.params.boardId,
      req.body
    );
    res.json(newTask);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  try {
    const { taskId, boardId } = req.params;
    const task = await taskService.getByIdOnBoard(boardId, taskId);
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  try {
    const { taskId, boardId } = req.params;
    const taskData = await taskService.deleteById(boardId, taskId);
    res.json(taskData);
  } catch (err) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await taskService.updateById(taskId, req.body);
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(404).send(err.message);
  }
});

module.exports = router;
