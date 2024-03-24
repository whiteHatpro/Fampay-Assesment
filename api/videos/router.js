const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return req.container.resolve('getVideosAPI').handleRequest(req, res);
});

module.exports = router;
