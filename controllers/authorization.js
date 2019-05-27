const redisClient = require('../utils').redisClient;

const requireAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).json('Unautorized');
  }
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(401).json('Unautorized');
    }
    console.log('you shall pass')
    return next();
  })
}

module.exports = {
  requireAuth
}