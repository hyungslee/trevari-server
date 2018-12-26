import express from 'express';
import router from './src/routes';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import { authMiddleware } from "./src/middlewares";

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authMiddleware);
const port = 5000;
app.set('port', port);
app.use(cors());
app.use(router);
const server = http.createServer(app);

server.listen(port,() => {
    console.log('server on 5000');
});

