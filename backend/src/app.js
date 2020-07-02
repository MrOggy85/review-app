/* eslint-disable import/first */
import { config } from 'dotenv';
import { createDB } from './db/db';

createDB();
config();

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import winston from './config/winston';
import cors from 'cors';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import EmployeeRouter from './routes/Employee';
import ReviewRouter from './routes/Review';
/* eslint-enable import/first */

// application error handler
process.on('uncaughtException', (err) => {
  winston.error('APPLICATION FAILED ', err);
  process.exit(1);
});

// not implemented
const mandatoryEnv = [
  // 'MYSQL_USERNAME',
  // 'MYSQL_PASSWORD',
  // 'MMYSQL_HOST',
  // 'PORT',
  // 'SESSION_SECRET',
];

winston.debug('Mandatory ENV:');
mandatoryEnv.forEach(x => winston.debug(`${x}: ${process.env[x]}`));

const emptyMandatoryEnv = mandatoryEnv.filter(x => !process.env[x]);
if (emptyMandatoryEnv.length > 0) {
  emptyMandatoryEnv.forEach(x => winston.error(`env ${x} not set`));
  throw new Error('Mandatory Env missing');
}

const optionalEnv = [
  {
    env: 'NODE_ENV',
    default: 'development',
  },
  {
    env: 'BASE_URL',
    default: '',
  },
];

winston.debug('Optional ENV:');
optionalEnv.forEach(x => winston.debug(`${x.env}: ${process.env[x.env]}`));

const emptyOptionalEnv = optionalEnv.filter(x => !process.env[x.env]);
if (emptyOptionalEnv.length > 0) {
  emptyOptionalEnv.forEach(x => winston.warn(`env ${x.env} not set. Using default: ${x.default}`));
}

const {
  PORT,
  SESSION_SECRET,
  API_USERNAME,
  API_PASSWORD,
  BASE_URL = '',
} = process.env;

// ------------- API Node Server Setup -------------
const app = express();
app.set('port', 5000);
app.disable('x-powered-by');
app.use(logger('combined', { stream: winston.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// enable CORS
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

passport.use(new LocalStrategy((username, password, done) => {
  // this code is not fully implemented
  // and it only allows for one users
  // it should check for user and password against the DB
  if (username === API_USERNAME && password === API_PASSWORD) {
    return done(null, { username, password });
  }
  return done(null, false, { message: 'incorrect auth' });
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.post(
  `${BASE_URL}/login`,
  passport.authenticate('local'),
  (req, res) => {
    req.logIn(req.user, (err) => {
      if (err) {
        throw err;
      }
    });
    res.send({ ok: 1337 });
  },
);

// not implemented yet
function authenticate(req, res, next) {
  next();
}

app.use(`${BASE_URL}/employee`, authenticate, EmployeeRouter);
app.use(`${BASE_URL}/review`, authenticate, ReviewRouter);

// 404
app.use((req, res, next) => {
  winston.debug('404 catcher reached', req.url);
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  winston.error(`${req.ip} - ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - `, err);

  res.status(err.status || 500);
  res.send({
    error: res.locals.error,
    message: res.locals.message,
  });
});

app.listen(app.get('port'), async () => {
  winston.info(`server listen at :${app.get('port')}${BASE_URL}/`);
});
