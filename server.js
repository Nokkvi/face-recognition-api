const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const morgan = require('morgan');

let connection = {};
if(process.env.NODE_ENV === 'production') {
  connection = {
    host : process.env.DATABASE_URL,
    ssl: true,
  }
} else {
  connection = {
    host : process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
}
console.log("URI", process.env.POSTGRES_URI)
const db = require('knex')({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const auth = require('./controllers/authorization');

const app = express();

app.use(bodyParser.json());
app.use(morgan('combined'))
app.use (cors());

app.get('/', (req, res) => {
	res.send('It is working!');
})

app.post('/signin', signin.signinAuthentication(db, bcrypt))

app.post('/register', (req, res) => {register.handleRegister(req, res, db ,bcrypt)})

app.get('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/profile/:id', auth.requireAuth, (req, res) => {profile.handleProfileUpdate(req, res, db)})

app.put('/image', auth.requireAuth, (req, res) => {image.handleImage(req, res, db)})

app.post('/image', auth.requireAuth, (req, res) => {image.handleApiCall(req, res)})

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
	console.log(`app is running on port ${PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/