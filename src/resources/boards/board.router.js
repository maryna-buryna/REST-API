const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const allBoards = await boardService.getAll();
  res.json(allBoards);
});

router.route('/').post(async (req, res) => {
  try {
    const newBoard = await boardService.create(req.body);
    res.json(newBoard);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const boardId = await boardService.deleteById(req.params.id);
    res.json(boardId);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await boardService.updateById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
