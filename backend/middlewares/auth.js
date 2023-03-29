const jwt = require('jsonwebtoken');
const UnautorizedError = require('../utils/UnautorizedError');
const { SECRET } = require('../utils/constants');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnautorizedError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return next(new UnautorizedError('Необходима авторизация'));
  }
  req.user = payload;

  return next();
};
