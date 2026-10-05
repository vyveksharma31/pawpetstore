const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'pawpetstore_super_secret_jwt_key_replace_in_production';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

const generateToken = (userId, role = 'customer') => {
  return jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };
