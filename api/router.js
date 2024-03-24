const express = require('express');
const router = express.Router();

const videoRouter = require('./videos/router');

router.use('/videos', videoRouter);

module.exports = router;
