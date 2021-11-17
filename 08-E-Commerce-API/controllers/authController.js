const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
  }

  // first registered us is an admin
  const isFirstAccount = await User.countDocuments({});
  console.log(isFirstAccount);
  const role = isFirstAccount ? 'user' : 'admin';

  const user = await User.create({ name, email, password, role });
  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send('login');
};

const logout = async (req, res) => {
  res.send('logout');
};

module.exports = {
  register,
  login,
  logout,
};
