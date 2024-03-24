const express = require('express');
const bodyParser = require('body-parser');
const diContainer = require('./dependency-injection'); // dependency injection
const routes = require('./api/router.js');
const appConfig = require('./config');

const server = express();

server.use(
    bodyParser.json({
        limit: '10mb',
        strict: false
    })
);

// inject dependencies
server.use((req, res, next) => {
    req.diContainer = diContainer.createScope();
    next();
});

// register routes
server.use('/video-service', routes);

// start server
const portNumber = appConfig.app.port;
server.listen(portNumber, () => {
    console.log(`Server is running on port ${portNumber}`);
});
