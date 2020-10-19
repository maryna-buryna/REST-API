const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res, next) => {
  try {
    const allUsers = await usersService.getAll();
    res.json(allUsers);
  } catch (err) {
    return next(err);
  }
});

router.route('/').post(async (req, res, next) => {
  try {
    const newUser = await usersService.create(req.body);
    res.json(newUser);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').get(async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').delete(async (req, res, next) => {
  try {
    const userId = await usersService.deleteById(req.params.id);
    res.json(userId);
  } catch (err) {
    return next(err);
  }
});

router.route('/:id').put(async (req, res, next) => {
  try {
    const user = await usersService.updateById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
