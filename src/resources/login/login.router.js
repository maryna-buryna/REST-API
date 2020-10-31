const router = require('express').Router();
const loginService = require('./login.service');
const createHttpError = require('http-errors');
const { FORBIDDEN } = require('http-status-codes');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;
  console.log(login, password);
  if (!login || !password) {
    throw new createHttpError(FORBIDDEN, 'The login/password is not valid');
  }
  const loginData = await loginService.authenticate(login, password);
  res.json(loginData);
});

module.exports = router;
