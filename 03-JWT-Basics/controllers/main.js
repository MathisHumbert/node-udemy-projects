// check username, password in post(login) request
// if exist create new JWT
// setup authentication so only the request with JWT can access the dashboard

const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error');

// compture ==login==> server
// server ==jwt==> computer
const login = async (req, res) => {
  const { username, password } = req.body;

  // error handle:
  // - mongoose
  // - Joi
  // - chexk in the controller

  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  // just for demo, normally provided byDB!!!
  const id = new Date().getDate();

  // create a new token
  //payload, secret, options
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  console.log(username, password);
  res.status(200).json({ msg: 'user created', token });
};

// compture ==jwt==> server
// server ==response==> computer
const dashboard = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomAPIError('No token provided', 401);
  }

  const token = authHeader.split(' ')[1];
  console.log(token);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, John Doe`,
    secret: `Here is yout authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
