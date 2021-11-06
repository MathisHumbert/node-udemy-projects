const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  // hash password in the controller way:
  // const { name, email, password } = req.body;
  // const salt = await bcrypt.genSalt(10);
  // const hashedPassword = await bcrypt.hash(password, salt);
  // const tempUser = { name, email, password: hashedPassword };

  // create token in the controller way:
  // const token = jwt.sign({ userId: user.id, name: user.name }, 'jwtSecret', {
  //   expiresIn: '30d',
  // });

  const user = await User.create(req.body);
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send('login user');
};

module.exports = { register, login };
