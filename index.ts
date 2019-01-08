import express from 'express';
const indexRouter = require('./src/routes/index');
import cors from 'cors';
import path from 'path';
let debug = require('debug')('express-sequelize');
import bodyParser from 'body-parser';
import http from 'http';
import logger from "morgan";
import createError from "http-errors";
const models = require('./src/models/index');
import { normalizePort } from './src/util';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  console.log('error!');
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log('err', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error message
  res.status(err.status || 500);
  // res.render('error');
  res.send(err.message);
});

const server = http.createServer(app);
models.sequelize.sync().then(function () {
  server.listen(port, function () {
    debug(`Express server listening on port ${port}`);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});
