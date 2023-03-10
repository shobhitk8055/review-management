const httpStatus = require('http-status');
const { User, Request, Feedback } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (body) => {
  const userBody = body;
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  userBody.privileges = ['user'];
  userBody.employeeId = `EMP${Math.floor(1000 + Math.random() * 9000)}`;
  return User.create(userBody);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async () => {
  const users = await User.find({ role: 'user' });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await Request.deleteMany({ employee: userId });
  await Feedback.deleteMany({
    $or: [{ employee: userId }, { reviewer: userId }],
  });
  await user.remove();
  return user;
};

/**
 * Make an employee admin
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const makeAdmin = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const priv = [...user.privileges];
  priv.push('admin');
  user.privileges = priv;
  await user.save();
  return user;
};

/**
 * Remove admin access from user
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const removeAdmin = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  let priv = [...user.privileges];
  priv = priv.filter((i) => i !== 'admin');
  user.privileges = priv;
  await user.save();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  makeAdmin,
  removeAdmin,
};
