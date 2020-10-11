const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const allUsers = await usersService.getAll();
    res.json(allUsers);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const newUser = await usersService.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    const userId = await usersService.deleteById(req.params.id);
    res.json(userId);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.updateById(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

module.exports = router;
