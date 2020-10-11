const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const userData = new User(req.body);
  const newUser = await usersService.create(userData);

  res.json(newUser ? User.toResponse(newUser) : null);
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user ? User.toResponse(user) : null);
  } catch (err) {
    res.sendStatus(404).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const userId = await usersService.deleteById(req.params.id);
    res.json(userId);
  } catch (err) {
    res.sendStatus(404).send(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.updateById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.sendStatus(404).send(err.message);
  }
});

module.exports = router;
