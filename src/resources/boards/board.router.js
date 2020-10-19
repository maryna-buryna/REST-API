const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const allBoards = await boardService.getAll();
  res.json(allBoards);
});

router.route('/').post(async (req, res, next) => {
  try {
    const newBoard = await boardService.create(req.body);
    res.json(newBoard);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const board = await boardService.getById(req.params.id);
    res.json(board);
  } catch (err) {
    console.log('jdsklsfjask', err.message);
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const boardId = await boardService.deleteById(req.params.id);
    res.json(boardId);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await boardService.updateById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
