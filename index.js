const express = require('express');
const bodyParser = require('body-parser');
const container = require('./di'); // dependency injection
const router = require('./api/router.js');
const config = require('./config');


const app = express();

app.use(
    bodyParser.json({
        limit: '10mb',
        strict: false
    })
);

// inject dependencies
app.use((req, res, next) => {
    req.container = container.createScope();
    next();
});

// register routes
app.use('/video-service', router);

// start server
const port = config.app.port;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
