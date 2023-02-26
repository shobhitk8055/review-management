const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  let user = await userService.createUser(req.body);
  user = user.toObject();
  user.id = user._id;
  delete user._id;
  delete user.__v;
  user.loginRole = "user";
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password, loginRole } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password, loginRole);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const me = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send(req.user);
});

module.exports = {
  register,
  login,
  logout,
  me,
};
