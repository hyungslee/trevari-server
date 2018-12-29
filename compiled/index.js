"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter = require('./src/routes/index');
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
var debug = require('debug')('express-sequelize');
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const models = require('./src/models/index');
const middlewares_1 = require("./src/middlewares");
const util_1 = require("./src/util");
const http_errors_1 = __importDefault(require("http-errors"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(middlewares_1.authMiddleware);
const port = util_1.normalizePort(process.env.PORT || 5000);
app.set('port', port);
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;
    // handle specific listen errors with friendly messages
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
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use((req, res, next) => {
    console.log('error!');
    next(http_errors_1.default(404));
});
app.use(function (err, req, res, next) {
    console.log('err', err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error message
    res.status(err.status || 500);
    //res.render('error');
    res.send(err.message);
});
const server = http_1.default.createServer(app);
models.sequelize.sync().then(function () {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function () {
        debug('Express server listening on port ' + port);
    });
    server.on('error', onError);
    server.on('listening', onListening);
});
