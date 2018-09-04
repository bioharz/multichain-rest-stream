'use strict';

const logger = require('console-server');
const express = require('express');
const bodyParser = require('body-parser');

const MultichainRouter = require('./multichain-router');

const PORT = 9123;
const IP = '127.0.0.1';
const app = express();

/*
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
*/

app.use(function(req, res, next) {
    bodyParser.urlencoded({
        extended: false
    });
    bodyParser.json();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let multichainRouter = new MultichainRouter(
    process.env.MULTICHAIN_HOST,
    process.env.MULTICHAIN_PORT,
    process.env.MULTICHAIN_USER,
    process.env.MULTICHAIN_PASS
);

multichainRouter.setupRoutes(app);

app.get('/health', (req, res) => {
    res.send('OK');
});

let server = app.listen(PORT, IP, function () {
    logger.info(`Multichain REST running on port ${IP}:${PORT}`);
});

server.timeout = 15000;

