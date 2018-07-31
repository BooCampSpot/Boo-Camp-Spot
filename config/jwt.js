const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
    email: user.email,
    admin: user.admin
  }, process.env.JWT_SECRET, { expiresIn: '1w' });
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  createToken,
  decodeToken
}