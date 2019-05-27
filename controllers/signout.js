const utils = require('../utils');

const redisClient = utils.redisClient;

const handleSignOut = () => (req, res) => {
	return deleteSessionToken(req, res)
}

const deleteSessionToken = (req, res) => {
	const { authorization } = req.headers;
	return redisClient.del(authorization, (err, reply) => {
		if (err || !reply) {
			return res.status(400).json('Bad Request');
		}
		return res.json()
	});
}

module.exports = {
  handleSignOut
}