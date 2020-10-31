const router = require('express').Router();
const validator = require('../../middlewares/validation/validator');
const schemas = require('../../middlewares/validation/schemas');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const allBoards = await boardService.getAll();
  res.json(allBoards);
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardService.create(req.body);
  res.json(newBoard);
});

router.route('/:id').get(validator(schemas.id, 'params'), async (req, res) => {
  const board = await boardService.getById(req.params.id);
  res.json(board);
});

router
  .route('/:id')
  .delete(validator(schemas.id, 'params'), async (req, res) => {
    const boardId = await boardService.deleteById(req.params.id);
    res.json(boardId);
  });

router.route('/:id').put(validator(schemas.id, 'params'), async (req, res) => {
  const user = await boardService.updateById(req.params.id, req.body);
  res.json(user);
});

module.exports = router;
