const router = require('express').Router();
const validator = require('../../middlewares/validation/validator');
const schemas = require('../../middlewares/validation/schemas');
const usersService = require('./user.service');
const createHttpError = require('http-errors');
const { CONFLICT } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const allUsers = await usersService.getAll();
  res.json(allUsers);
});

router.route('/').post(
  // validator(schemas.id, 'params'), // todo: postValidator
  async (req, res, next) => {
    try {
      const newUser = await usersService.create(req.body);
      res.json(newUser);
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new createHttpError(CONFLICT, 'User already exist!');
      }
      return next(err);
    }
  }
);

router.route('/:id').get(validator(schemas.id, 'params'), async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(user);
});

router
  .route('/:id')
  .delete(validator(schemas.id, 'params'), async (req, res) => {
    const userId = await usersService.deleteById(req.params.id);
    res.json(userId);
  });

router.route('/:id').put(
  validator(schemas.id, 'params'),
  // validator(schemas.id, 'params'), // todo: postValidator
  async (req, res) => {
    const user = await usersService.updateById(req.params.id, req.body);
    res.json(user);
  }
);

module.exports = router;
