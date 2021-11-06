// check username, password in post(login) request
// if exist create new JWT
// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const { BadRequestError } = require('../errors');

// compture ==login==> server
// server ==jwt==> computer
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  // just for demo, normally provided byDB!!!
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  console.log(username, password);
  res.status(200).json({ msg: 'user created', token });
};

// compture ==jwt==> server
// server ==response==> computer
const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is yout authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
