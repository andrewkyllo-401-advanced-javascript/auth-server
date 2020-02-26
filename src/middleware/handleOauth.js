const superagent = require('superagent');
const user = require('../models/users');

// put these in .env
const TOKEN_SERVER_URL = '';
const CLIENT_ID = '';
const CLIENT_SECRET = '';
const API_SERVER = '';
const REMOTE_API_ENDPOINT = 'https://api.github.com/user';

async function exchangeCodeForToken (code) {
  const response = await superagent
    .post(TOKEN_SERVER_URL)
    .send({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: API_SERVER,
      state: '',
    });
  return response.body.access_token;
}

async function getUser (username) {
  const user = await user.findOneAndUpdate({ username }, { upsert: true });
  const token = user.generateToken();
  return [user, token];
}

async function getRemoteUserName (token) {
  const response = await superagent
    .get(REMOTE_API_ENDPOINT)
    .set('Authorization', `tokane ${token}`)
    .set('user-agent', 'express-app');
  return response.body.login;
}

async function handleOath (req, res, next) {
  try {
    const remoteToken = await exchangeCodeForToken(req.query.code);
    const remoteUsername = await getRemoteUserName(remoteToken);
    const [user, token] = await getUser(remoteUsername);
    req.user = user;
    req.token = token;
    next();
  }
  catch (err) {
    next(`ERROR: ${err.message}`);
  }
}

module.exports = handleOath;