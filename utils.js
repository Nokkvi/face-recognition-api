const jwt = require('jsonwebtoken');
const redis = require('redis');

//setup Redis:
const redisClient = redis.createClient(process.env.REDIS_URI);

const signToken = (email) => {
	const jwtPayload = { email };
	return jwt.sign(jwtPayload, 'secret', { expiresIn: '2 days'});
}

const setToken = (key, value) => {
	return Promise.resolve(redisClient.set(key, value))
}

const createSession = (user) => {
	// JWT token, return user data
	const { email, id } = user;
	const token = signToken(email);
	return setToken(token, id)
		.then(() => {
			return { success: 'true', userId: id, token}
		})
		.catch(console.log)
}

module.exports = {
  redisClient,
  createSession
}