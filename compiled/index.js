"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/routes"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const morgan_1 = __importDefault(require("morgan"));
const middlewares_1 = require("./src/middlewares");
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(middlewares_1.authMiddleware);
const port = 5000;
app.set('port', port);
app.use(cors_1.default());
app.use(routes_1.default);
const server = http_1.default.createServer(app);
server.listen(port, () => {
    console.log('server on 5000');
});
