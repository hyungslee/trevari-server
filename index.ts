var express = require('express');
const indexRouter = require('./src/routes/index');
var cors = require('cors');
const path = require('path');
const debug = require('debug')('express-sequelize');
const bodyParser = require('body-parser');
const http = require('http');
const logger = require('morgan');
const createError = require('http-errors');
var models = require('./src/models/index');
const normalizePort = require('./src/util').normalizePort;
const onError = require('./src/util').onError;
const app = express();
const onListening = function () {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res, next) => {
  console.log('error!');
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log('err', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send(err.message);
});

const server = http.createServer(app);
models.sequelize.sync().then(() => {
  server.listen(port, () => {
    debug(`Express server listening on port ${port}`);
  });
  server.on('error', onError);
  server.on('listening', onListening);
});
